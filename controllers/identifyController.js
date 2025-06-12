const { Op } = require('sequelize');
const Contact = require('../models/contact');

exports.identify = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'email or phoneNumber is required.' });
    }

    const matched = await Contact.findAll({
      where: {
        [Op.or]: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
      },
      order: [['createdAt', 'ASC']],
    });

    if (matched.length === 0) {
      const newContact = await Contact.create({ email, phoneNumber });
      return res.json({
        contact: {
          primaryContactId: newContact.id,
          emails: [newContact.email],
          phoneNumbers: [newContact.phoneNumber],
          secondaryContactIds: [],
        },
      });
    }

    // get all related contacts (primary + secondaries)
    const ids = new Set();
    matched.forEach((c) => {
      ids.add(c.id);
      if (c.linkedId) ids.add(c.linkedId);
    });

    const related = await Contact.findAll({
      where: {
        [Op.or]: [{ id: Array.from(ids) }, { linkedId: Array.from(ids) }],
      },
      order: [['createdAt', 'ASC']],
    });

    const primary = related.find((c) => c.linkPrecedence === 'primary');
    const alreadyExists = related.some((c) => c.email === email && c.phoneNumber === phoneNumber);

    if (!alreadyExists) {
      await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: 'secondary',
        linkedId: primary.id,
      });
    }

    const allEmails = new Set();
    const allPhones = new Set();
    const secondaryIds = [];

    related.forEach((c) => {
      if (c.email) allEmails.add(c.email);
      if (c.phoneNumber) allPhones.add(c.phoneNumber);
      if (c.id !== primary.id) secondaryIds.push(c.id);
    });

    return res.json({
      contact: {
        primaryContactId: primary.id,
        emails: Array.from(allEmails),
        phoneNumbers: Array.from(allPhones),
        secondaryContactIds: secondaryIds,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
