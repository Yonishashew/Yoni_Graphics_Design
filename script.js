
/* ---------- Stats Modal ---------- */
function showInfo(stat) {
  const modal = document.getElementById('info-modal');
  const text = document.getElementById('modal-text');
  if(stat === 'Happy Users') text.innerText = `We have ${getUserCount()} happy users worldwide who love our design and editing services.`;
  else if(stat === 'Completed Projects') text.innerText = 'We successfully completed over 320 projects for clients from various industries.';
  else if(stat === 'Awards Won') text.innerText = 'Our work has been recognized with 12 prestigious awards for creativity and quality.';
  modal.style.display = 'block';
}
function closeInfo() { document.getElementById('info-modal').style.display='none'; }
window.onclick = function(event){ 
  if(event.target.classList.contains('modal')) { event.target.style.display='none'; }
}

/* ---------- Sign In / Sign Up Modals ---------- */
function openSignIn(){ document.getElementById('signin-modal').style.display='block'; }
function closeSignIn(){ document.getElementById('signin-modal').style.display='none'; }
function openSignUp(){ document.getElementById('signup-modal').style.display='block'; }
function closeSignUp(){ document.getElementById('signup-modal').style.display='none'; }

/* ---------- LocalStorage Helpers ---------- */
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}
function getUserCount() {
  return getUsers().length + 1500; // base 1500 users
}
function updateHappyUsers() {
  const happyUsers = document.getElementById('happy-users');
  animateCount(happyUsers, getUserCount(), 2000);
}

/* ---------- Counter Animation ---------- */
function animateCount(element, target, duration=2000){
  let start = 0;
  const increment = target / (duration/50);
  const counter = setInterval(()=>{
    start += increment;
    if(start >= target){
      start = target;
      clearInterval(counter);
    }
    element.innerText = Math.floor(start);
  },50);
}

/* ---------- Animate Other Stats ---------- */
function animateStats(){
  const counts = document.querySelectorAll('.count');
  counts.forEach(c=>{
    const target = +c.getAttribute('data-target');
    animateCount(c, target, 2000);
  });
}

/* ---------- Sign Up ---------- */
function checkSignUp() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-password').value.trim();
  const msg = document.getElementById('signup-msg');

  if(!name || !email || !pass){
    msg.style.color = 'red';
    msg.innerText = 'Please fill all fields!';
    return;
  }

  let users = getUsers();
  if(users.some(u => u.email === email)){
    msg.style.color = 'red';
    msg.innerText = 'Email already registered!';
    return;
  }

  users.push({name, email, pass});
  localStorage.setItem('users', JSON.stringify(users));

  // Set session
  sessionStorage.setItem('currentUser', JSON.stringify({name,email}));

  msg.style.color = 'green';
  msg.innerText = `Welcome ${name}! You are signed up successfully.`;

  // Clear inputs
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';

  updateHappyUsers();
  setTimeout(closeSignUp, 2000);
}

/* ---------- Sign In ---------- */
function checkSignIn() {
  const email = document.getElementById('signin-email').value.trim();
  const pass = document.getElementById('signin-password').value.trim();
  const msg = document.getElementById('signin-msg');

  let users = getUsers();
  const user = users.find(u => u.email === email && u.pass === pass);

  if(user){
    sessionStorage.setItem('currentUser', JSON.stringify({name:user.name,email:user.email}));
    msg.style.color = 'green';
    msg.innerText = `Welcome back, ${user.name}!`;
    document.getElementById('signin-email').value = '';
    document.getElementById('signin-password').value = '';
    setTimeout(closeSignIn, 2000);
  } else {
    msg.style.color = 'red';
    msg.innerText = 'Email or Password Incorrect!';
  }
}

/* ---------- Auto Welcome & Initialize ---------- */
window.onload = function() {
  updateHappyUsers();
  animateStats();
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if(currentUser){
    alert(`Hello ${currentUser.name}, you are already signed in!`);
  }
}

