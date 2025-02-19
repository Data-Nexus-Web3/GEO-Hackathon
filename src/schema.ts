export const propertyRecordsSchema = {
  name: "PropertyRecords",
  description: "A collection of public property records.",
  fields: [
    { name: "permit", type: "string", required: true },
    { name: "propertyRecordType", type: "string", required: true },
    { name: "recordNumber", type: "string", required: true },
    { name: "status", type: "string", required: true },
    { name: "description", type: "string" },
    { name: "expiration", type: "date" },
    { name: "submissionDate", type: "date" },
  ],
};
