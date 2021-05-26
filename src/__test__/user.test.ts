import request from "supertest";
import app from "../app";
import { dbDisconnect } from "../database/testDBConnection";
import { SignUp, Login, Organization } from "../controllers/interfaces";

const testUser: Record<string, any> = {};
let id = "";
let testOrg: Organization;


describe("User registration and authentication", () => {
    it("should sign up a user", async () => {
        const testUserData: SignUp = {
            firstname: "Amanda",
            lastname: "Adichie",
            email: "amandaadichie@gmail.com",
            password: "amanda123",
            confirmpassword: "amanda123"
        };
        const res = await request(app).post("/signup").send(testUserData);
        expect(res.status).toBe(201);
        expect(res.body.status).toBe("Successful");
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("data");

    });

    it("should login a user and give a token", async () => {
        const loginData: Login = {
            email: "amandaadichie@gmail.com",
            password: "amanda123"
        }
        const res = await request(app).post("/login").send(loginData);
        console.log(res.body);
        testUser.id = res.body.id;
        testUser.email = res.body.data;
        testUser.password = "amanda123";
        testUser.token = res.body.token;

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("token");
        expect(res.body.status).toEqual("Login successful");
        
    });
});

describe("Organization crud operations test", () => {
    it("should create a new organization", async () => {
        testOrg = {
            organization: "node samurai",
            products: ["developers", "bugs"],
            marketValue: "90%",
            address: "Sangotedo",
            ceo: "Big Man",
            country: "Nigeria",
            noOfEmployees: 20,
            employees: ["James Bond", "David"]
        };

        const res = await request(app)
            .post("/users/post")
            .send(testOrg)
            .set('authorization', `Bearer ${testUser.token}`);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("status");
        expect(res.body.status).toEqual("Successful");

        testOrg = res.body.data;
        id = res.body.data._id;
    });

    it("should update an organization", async () => {
        const updatedData = {
            organization: "American Ninja"
        };
        const res = await request(app)
            .put(`/users/update/${testOrg._id}`)
            .send(updatedData)
            .set("authorization", `Bearer ${testUser.token}`);
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('Successful');
        expect(res.body.data._id).toBe(testOrg._id);
        expect(res.body.data.organization).toBe('American Ninja');
    });

    it("should delete an organization", async () => {
        const res = await request(app)
            .delete(`/users/delete/${testOrg._id}`)
            .set("authorization", `Bearer ${testUser.token}`);
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('data');
        expect(res.body.status).toEqual('Successful');
        expect(res.body.data._id).toEqual(testOrg._id);


    });

});

afterAll(async () => {
    await dbDisconnect();
});

