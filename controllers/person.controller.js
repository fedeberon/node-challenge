const db = require("../models");
const Person = db.person;
const Address = db.adddress;
const Op = db.Sequelize.Op;
const logger = require('../config/logger');

Person.hasMany(Address, { as: 'addresses' });
Address.belongsTo(Person);

exports.create = async (req, res) => {
    if (!req.body.firstName) {
        res.status(400).send({
            message: "Fist name can not be empty!"
        });
        return;
    }

    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    try {
        const createdPerson = await Person.create(person);

        if (req.body.addresses && req.body.addresses.length > 0) {
            const addresses = req.body.addresses.map(address => ({
                street: address.street,
                city: address.city,
                personId: createdPerson.id
            }));

            await Address.bulkCreate(addresses);

        }

        res.status(200).send(createdPerson);

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Person."
        });
    }
};


exports.findAll = (req, res) => {
    const firstName = req.query.firstName;
    let condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

    Person.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error('Some error occurred while retrieving persons.', err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving persons."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Person.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error('Error retrieving Person with id=' + id, err);
            res.status(500).send({
                message: "Error retrieving Person with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Person.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Person with id=${id}. Maybe Person was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            logger.error('Error updating Person id=' + id, err);
            res.status(500).send({
                message: "Error updating Person with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Person.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Person with id=${id}.`
                });
            }
        })
        .catch(err => {
            logger.error('Could not delete Person with id=' + id, err);
            res.status(500).send({
                message: "Could not delete Person with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Person.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Person were deleted successfully!` });
        })
        .catch(err => {
            logger.error('Some error occurred while removing all people', err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all people."
            });
        });
};
