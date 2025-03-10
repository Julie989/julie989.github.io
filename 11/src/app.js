//rc-write-2

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnhyY2x0amFuamN6ZmVsaHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjc0NjAsImV4cCI6MjA1Njg0MzQ2MH0.VqTvM07Ir1v71X2Pxi37KyNXk7wIB4IKyqZUVbD1PDA";
const url = "https://bynxrcltjanjczfelhpp.supabase.co";
const database = supabase.createClient(url, key);
const tableName = "realtimedatabase2";
let id = null;

let currentSpeedOutput = document.getElementById("current-speed-value"); 
let currentSpeedValue = 0; 

document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", handleClick);
  button.addEventListener("touchstart", handleClick); // Mobile support
});

function handleClick() {
  let selectedSpeed = this.innerText.trim();
  if (currentSpeedValue == selectedSpeed) return;

  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
  currentSpeedValue = selectedSpeed;
  currentSpeedOutput.innerHTML = currentSpeedValue;
  this.disabled = true;
  
  let values = { x: currentSpeedValue, y: 0 };
  updateSupabase(1, values);
}


//update the values on mouse move
//document.addEventListener("mousemove", async (e) => {
//  let values = { x: e.clientX, y: e.clientY };
//  if (id) {
//    updateSupabase(id, values);
//  }
//});

//check if page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  //get next id
  id = await getNextId();
  //check if row exists
  if (id) {
    let isExists = await checkRowExists(id);
    if (!isExists) {
      //insert row
      insertSupabase(id, { x: 0, y: 0 });
      document.getElementById("your-id").innerText = id;
    }
  }
});

//get next id
async function getNextId() {
  let res = await database.from(tableName).select("id");
  return res.data.length + 1;
}

//update row
async function updateSupabase(id, values) {
  //get time now in Zurich
  let now = new Date();

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
