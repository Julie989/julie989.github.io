//rc-write-2

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnhyY2x0amFuamN6ZmVsaHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjc0NjAsImV4cCI6MjA1Njg0MzQ2MH0.VqTvM07Ir1v71X2Pxi37KyNXk7wIB4IKyqZUVbD1PDA";
const url = "https://bynxrcltjanjczfelhpp.supabase.co";
const database = supabase.createClient(url, key);
const tableName = "realtimedatabase3";
let id = null;

let currentSpeedOutput = document.getElementById("current-speed-value");
let currentSpeedValue = 0;


// Get all radio buttons with the name "fan_number"
const fanNumber = document.querySelectorAll('input[name="fan_number"]');
let selectedFanValue = 11;
insertSupabase(id, { x: 0, y: 5 });


//update row
async function updateSupabase(id, values) {
  let res = await database
    .from(tableName)
    .update({
      values: values,
      updated_at: new Date(),
    })
    .eq("id", id);
}

//insert row
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