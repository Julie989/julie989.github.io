//rc-write-1

const key =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZHNsYmt1eHFodXRlZnlhd3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjA2MDQsImV4cCI6MjA1NjgzNjYwNH0.c03kDb-EldxxkXxrtkpXMIQ68YfdO7-Cw9CVdAkPYqg";
const url = 'https://njdslbkuxqhutefyawuk.supabase.co';
const database = supabase.createClient(url, key);
const tableName = "magneticHeading-database";

//document.addEventListener("mousemove", async (e) => {
//  let values = { x: e.clientX, y: e.clientY };
//  updateSupabase(1, values);
//});

async function updateSupabase(id, values) {
  let res = await database
    .from(tableName)
    .update({
      values: values,
      updated_at: new Date(),
    })
    .eq("id", id);
}

async function insertSupabase(id, values) {
  let res = await database.from(tableName).insert([
    {
      id: id,
      values: values,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

//check the row exists or not
async function checkRowExists(id) {
  let res = await database.from(tableName).select("*").eq("id", id);
  return res.data.length > 0;
}

setTimeout(async () => {
  let id = 10;
  let isExists = await checkRowExists(id);
  if (!isExists) {
    insertSupabase(id, values);
  } else {
    console.log("Row already exists");
  }
}, 1000);