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
  updateSupabase(id, values);
}

// Get all radio buttons with the name "fan_number"
const fanNumber = document.querySelectorAll('input[name="fan_number"]');
let selectedFanValue = 1;

// Add event listener to each radio button
fanNumber.forEach(radioButton => {
  radioButton.addEventListener('change', async function() {
    // 'this' refers to the clicked radio button
    selectedFanValue = this.value;
    id = parseInt(selectedFanValue, 10); // set the id to the selected fan value
    console.log("Selected fan number:", selectedFanValue);
    document.getElementById("your-id").innerText = selectedFanValue;

    //check if row exists
    let isExists = await checkRowExists(id);
    if (!isExists) {
      //insert row
      insertSupabase(id, { x: 0, y: 0 });
      console.log("Inserted row with ID:", id);
    }
  });
});

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