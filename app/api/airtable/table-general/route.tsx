import { NextResponse } from "next/server";
import { table1, getMinifiedItem } from "@/utils/airtable";

export async function GET() {
  try {
    const records = await table1.select({}).firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
    return NextResponse.json(formattedRecords);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  const res = await req.json();
  try {
    const newRecords = await table1.create([{ fields: res }]);
    return NextResponse.json(getMinifiedItem(newRecords[0]));
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: Request) {
  const res = await req.json();
  try {
    const updatedRecords = await table1.update([res]);
    return NextResponse.json(getMinifiedItem(updatedRecords[0]));
  } catch (error) {
    console.log(error);
  }
}
