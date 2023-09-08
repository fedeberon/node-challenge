const db = require("../models");
const Address = db.adddress;
const { create, findAll, update } = require("../controllers/person.controller");
jest.mock("../models");
const Person = db.person;

describe("create", () => {
    it("should create a new person", async () => {
        // Arrange
        const req = {
            body: {
                firstName: "Juan",
                lastName: "Perez",
                addresses: [
                    { street: "Street 1", city: "City 1" },
                    { street: "Street 2", city: "City 2" },
                ],
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        // Mock
        jest.spyOn(Person, "create").mockResolvedValue({
            id: 1,
            firstName: "Juan",
            lastName: "Perez",
        });

        jest.spyOn(Address, "bulkCreate").mockResolvedValue([
            { street: "Street 1", city: "City 1", personId: 1 },
            { street: "Street 2", city: "City 2", personId: 1 },
        ]);

        // Act
        await create(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            id: 1,
            firstName: "Juan",
            lastName: "Perez",
        });
    });
});

describe("Person Controller - findAll", () => {
    it("should retrieve persons with a matching firstName", async () => {
        // Arrange
        const req = {
            query: { firstName: "Juan" },
        };

        const res = {
            send: jest.fn(),
        };

        const findAllMock = jest.fn().mockResolvedValue([
            { id: 1, firstName: "Juan", lastName: "Perez" },
            { id: 2, firstName: "Pedro", lastName: "Garcia" },
        ]);
        Person.findAll = findAllMock;

        // Act
        await findAll(req, res);

        // Assert
        expect(findAllMock).toHaveBeenCalledWith({
            where: { firstName: { [db.Sequelize.Op.like]: "%Juan%" } },
        });
        expect(res.send).toHaveBeenCalledWith([
            { id: 1, firstName: "Juan", lastName: "Perez" },
            { id: 2, firstName: "Pedro", lastName: "Garcia" },
        ]);
    });

    it("should retrieve all persons when no firstName is provided", async () => {
        // Arrange
        const req = {
            query: {},
        };

        const res = {
            send: jest.fn(),
        };

        const findAllMock = jest.fn().mockResolvedValue([
            { id: 1, firstName: "Juan", lastName: "Perez" },
            { id: 2, firstName: "Pedro", lastName: "Garcia" },
        ]);
        Person.findAll = findAllMock;

        // Act
        await findAll(req, res);

        // Assert
        expect(findAllMock).toHaveBeenCalledWith({
            where: null,
        });
        expect(res.send).toHaveBeenCalledWith([
            { id: 1, firstName: "Juan", lastName: "Perez" },
            { id: 2, firstName: "Pedro", lastName: "Garcia" },
        ]);
    });
});

describe("Person Controller - update", () => {
    it("should update a person successfully", async () => {
        // Arrange
        const req = {
            params: { id: 1 },
            body: { firstName: "UpdatedFirstName" },
        };

        const res = {
            send: jest.fn(),
        };

        Person.update.mockResolvedValue(1);

        // Act
        await update(req, res);

        // Assert
        expect(res.send).toHaveBeenCalledWith({
            message: "Person was updated successfully.",
        });
    });
});
