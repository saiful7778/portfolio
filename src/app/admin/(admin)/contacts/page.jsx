import prisma from "../../../../../prisma";
import EmptyData from "@/components/EmptyData";
import Table from "@/components/table";
import moment from "moment";
import Actions from "./Actions";
import Link from "next/link";
import Details from "./Details";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contacts - admin - portfolio",
  description:
    "This is the all contacts management admin page of Saiful Islam portfolio website.",
};

async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany();
    if (!contacts) {
      throw new Error("No data available");
    }
    return contacts;
  } catch (err) {
    throw new Error(err);
  }
}

const Contacts = async () => {
  const contacts = await getContacts();

  if (contacts.length < 1) {
    return <EmptyData />;
  }

  const renderContacts = contacts.map((contact, idx) => (
    <TableDataRow key={"contact" + idx} inputData={contact} count={idx + 1} />
  ));

  return (
    <Table>
      <Table.caption className="bg-gray-800 p-2 font-semibold">
        Total Contact: <span>{contacts.length}</span>
      </Table.caption>
      <Table.head>
        <Table.headCell className="min-w-9 text-center">#NO</Table.headCell>
        <Table.headCell className="min-w-52">User details</Table.headCell>
        <Table.headCell className="min-w-64">Subject</Table.headCell>
        <Table.headCell className="min-w-28">Phone number</Table.headCell>
        <Table.headCell className="min-w-28">Details</Table.headCell>
        <Table.headCell className="min-w-28">Time</Table.headCell>
        <Table.headCell className="min-w-16">Actions</Table.headCell>
      </Table.head>
      <Table.body>{renderContacts}</Table.body>
    </Table>
  );
};

const TableDataRow = ({ inputData, count }) => {
  const { id, fullName, email, subject, details, phoneNumber, createdAt } =
    inputData || {};

  const createdTime = moment(createdAt).format("Do MMM YY, h:mm a");

  return (
    <Table.row>
      <Table.cell className="text-center font-semibold">{count}</Table.cell>
      <Table.cell>
        <div>
          <div className="text-sm font-bold leading-tight">{fullName}</div>
          <div className="text-xs text-gray-400">
            <Link href={`mailto:${email}`} className="link">
              {email}
            </Link>
          </div>
        </div>
      </Table.cell>
      <Table.cell>
        <p className="text-xs text-gray-400">{subject}</p>
      </Table.cell>
      <Table.cell className="text-center text-xs">{phoneNumber}</Table.cell>
      <Table.cell className="text-center">
        <Details data={details} />
      </Table.cell>
      <Table.cell className="text-center text-xs">{createdTime}</Table.cell>
      <Table.cell>
        <div className="flex items-center justify-center">
          <Actions contactId={id} />
        </div>
      </Table.cell>
    </Table.row>
  );
};

export default Contacts;
