import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { prisma } from "../prisma";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("My Server");
});

app.get("/test", (req: Request, res: Response) => {
  res.send(
    "Welcome Ini. You will make 100k in the next 1 year. This will all work out. Welldone, I love you"
  );
});

app.post("/createEmployee", async (req: Request, res: Response) => {
  const data = req.body;
  const { name, role, pay, location } = data;

  const employee = await prisma.employee.create({
    data: {
      name,
      role,
      pay,
      location,
    },
  });

  return res.json(employee);
});

app.post("/retrieveEmployee", async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = data;

  const retrievedEmployee = await prisma.employee.findUnique({
    where: {
      id,
    },
  });
  return res.json(retrievedEmployee);
});

app.post("/updateEmployee", async (req: Request, res: Response) => {
  const data = req.body;

  const { id, name, role, pay, location } = data;

  const updatedEmployee = await prisma.employee.update({
    where: { id },
    data: { name, role, pay, location },
  });

  return res.json(updatedEmployee);
});

app.post("/deleteEmployee", async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = data;

  const deletedEmployee = await prisma.employee.delete({
    where: {
      id,
    },
  });
  return res.json(deletedEmployee);
});

app.get("/listAllEmployees", async (req: Request, res: Response) => {
  const employeeList = await prisma.employee.findMany();

  return res.json(employeeList);
});

app.post("/createOffice", async (req: Request, res: Response) => {
  const data = req.body;
  const { location, employees, yearlyRevenue } = data;

  const newOffice = await prisma.office.create({
    data: {
      location,
      employees,
      yearlyRevenue,
    },
  });
  return res.json(newOffice);
});

app.post("/retrieveOffice", async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = data;

  const retrievedOffice = await prisma.office.findUnique({
    where: { id },
  });
  return res.json(retrievedOffice);
});

app.post("/updateoffice", async (req: Request, res: Response) => {
  const data = req.body;

  const { id, location, employees, yearlyRevenue } = data;

  const newOffice = await prisma.office.update({
    where: {
      id,
    },
    data: {
      location,
      employees,
      yearlyRevenue,
    },
  });
  return res.json(newOffice);
});

app.post("/deleteOffice", async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = data;

  const deletedOffice = await prisma.office.delete({
    where: { id },
  });
  return res.json(deletedOffice);
});

app.get("/listAllOffices", async (req: Request, res: Response) => {
  const officeList = await prisma.office.findMany();

  return res.json(officeList);
});

app.listen(port, () => {
  console.log(`[server] : Server is running at http://localhost:${port}`);
});
