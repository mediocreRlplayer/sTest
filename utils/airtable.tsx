import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY as string,
});

const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID as string);

const table1 = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_1 as string);
const table2 = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_2 as string);
const table3 = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_3 as string);

const minifyItems = (records: any) =>
  records.map((record: any) => getMinifiedItem(record));

const getMinifiedItem = (record: any) => {
  if (!record.fields.brought) {
    record.fields.brought = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};

export { table1, table2, table3, minifyItems, getMinifiedItem };
