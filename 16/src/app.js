const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bnhyY2x0amFuamN6ZmVsaHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjc0NjAsImV4cCI6MjA1Njg0MzQ2MH0.VqTvM07Ir1v71X2Pxi37KyNXk7wIB4IKyqZUVbD1PDA";
const url = "https://bynxrcltjanjczfelhpp.supabase.co";
const database = supabase.createClient(url, key);
const tableName = "realtimedatabase3";
const idleTime = 10000;
const content = document.getElementById("content");

//read in realtime when dom is ready
document.addEventListener("DOMContentLoaded", async () => {
  readSupabase();
  readSupabaseRealTime();
});

//Listen to changes in the database
async function readSupabaseRealTime() {
  database
    .channel(tableName)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: tableName },
      (data) => {
        draw(data);
      }
    )
    .subscribe();
}

async function readSupabase() {
  console.log("Reading data from Supabase");
  const { data } = await database
    .from(tableName)
    .select("*")
    .gte("updated_at", new Date(new Date() - idleTime).toISOString())
    .order("updated_at", { ascending: false });

  if (data && data.length > 0) {
    data.forEach(draw);
  }
}

let magneticHeading = 0;
let currentSpeedFanOne = 0;
let currentSpeedFanTwo = 0;
let previousSpeedSum = null; // Initialize previousSpeedSum to null

async function draw(data) {
  if (data.new) {
    data = data.new;
  }
  const item = document.getElementById(data.id);

 
    if (data.id === 1) {
      currentSpeedFanOne = Math.floor(data.values.x);
      console.log("Speed of fan 1 : " + currentSpeedFanOne);
    } else if (data.id === 2) {
      currentSpeedFanTwo = Math.floor(data.values.x);
      console.log("Speed of fan 2 : " + currentSpeedFanTwo);
    }
      else if (data.id === 11) {
    magneticHeading = Math.floor(data.values.y);
    console.log("Compass of fan 1 : " + magneticHeading);
  }
    const currentSpeedSum = currentSpeedFanOne + currentSpeedFanTwo;
    console.log("currentSpeedSum : " + currentSpeedSum);
    if (previousSpeedSum === null || currentSpeedSum !== previousSpeedSum) {
      changeMusicSource(currentSpeedSum);
      previousSpeedSum = currentSpeedSum; // Update previousSpeedSum
    } else {
    }
    return { headingOne: magneticHeading, speed: currentSpeedSum };
  
}

setInterval(() => {
  console.log("Checking for updates");
  readSupabase();
}, idleTime);

