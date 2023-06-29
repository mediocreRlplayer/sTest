import { NextResponse } from "next/server";
import { table2, getMinifiedItem } from "@/utils/airtable";

export async function GET() {
  try {
    const records = await table2.select({}).firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
    return new Response(JSON.stringify(formattedRecords));
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: Request) {
  const res = await req.json();
  try {
    const newRecords = await table2.create([{ fields: res }]);
    return new Response(JSON.stringify(getMinifiedItem(newRecords[0])));
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: Request) {
  const res = await req.json();
  try {
    const updatedRecords = await table2.update([res]);
    return NextResponse.json(getMinifiedItem(updatedRecords[0]));
  } catch (error) {
    console.log(error);
  }
}
