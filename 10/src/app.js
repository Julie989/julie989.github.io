//rc-write-1

const key =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qZHNsYmt1eHFodXRlZnlhd3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjA2MDQsImV4cCI6MjA1NjgzNjYwNH0.c03kDb-EldxxkXxrtkpXMIQ68YfdO7-Cw9CVdAkPYqg";
const url = 'https://njdslbkuxqhutefyawuk.supabase.co';
const database = supabase.createClient(url, key);
const tableName = "magneticHeading-database";
let values = {magneticHeading: alpha}; 

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


document.addEventListener('DOMContentLoaded', function() {
  const compassImage = document.getElementById('compassImage');
  const compassData = document.getElementById('compassData');
  

  // Function to determine cardinal direction
  function getCardinalDirection(angle) {
      const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
      angle += 22.5; // Adjust so the split between directions is centered on the cardinal direction
      if (angle < 0) angle += 360;
      angle %= 360;
      return directions[Math.floor(angle / 45)];
  }

  // Adjust the alpha angle for magnetic declination
  const magneticDeclination = 0; // Set your location's magnetic declination in degrees here

  function updateCompass(event) {
      if (event.alpha !== null) {
          let alpha = event.alpha;
          alpha += magneticDeclination; // Adjust compass reading by adding the magnetic declination

          // Rotate the compass needle
          compassImage.style.transform = `rotate(${-alpha}deg)`;

          // Get the cardinal direction
          const cardinalDirection = getCardinalDirection(alpha);
          compassData.innerHTML = `Magnetic Heading: ${alpha.toFixed(2)}° ${cardinalDirection}`;
          updateSupabase(1, alpha);
      }
  }

  // Check if DeviceOrientationEvent is supported
  if ('DeviceOrientationEvent' in window) {
      // Request permission for iOS devices
      if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
          DeviceMotionEvent.requestPermission()
              .then(permissionState => {
                  if (permissionState === 'granted') {
                      window.addEventListener('deviceorientation', updateCompass);
                  } else {
                      compassData.innerHTML = "Permission to access sensor was denied.";
                  }
              })
              .catch(console.error);
      } else {
          window.addEventListener('deviceorientation', updateCompass);
      }
  } else {
      compassData.innerHTML = "Your device does not support device orientation.";
  }
});