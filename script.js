let logos = {};
let data = {};

function addLogo(){
  let file = document.getElementById('logoInput').files[0];
  if(!file) return;
  let reader = new FileReader();
  reader.onload = ()=> {
    let name = prompt("Название команды:");
    if(!name) return;
    logos[name] = reader.result;
    renderLogos();
  };
  reader.readAsDataURL(file);
}

function renderLogos(){
  let c = document.getElementById('logoContainer');
  c.innerHTML = "";
  for(let t in logos){
    let img = document.createElement('img');
    img.src = logos[t];
    img.title = t;
    c.appendChild(img);
  }
}

function addMatch(){
  let age = document.getElementById('ageSelect').value;
  if(!data[age]) data[age]={teams:{}, matches:[]};

  let A=document.getElementById('teamA').value;
  let B=document.getElementById('teamB').value;
  let gA=parseInt(document.getElementById('scoreA').value);
  let gB=parseInt(document.getElementById('scoreB').value);
  if(!A||!B) return;

  let obj=data[age];
  if(!obj.teams[A]) obj.teams[A]={games:0,w:0,d:0,l:0,z:0,p:0};
  if(!obj.teams[B]) obj.teams[B]={games:0,w:0,d:0,l:0,z:0,p:0};

  obj.matches.push({A,B,gA,gB});

  obj.teams[A].games++; obj.teams[B].games++;
  obj.teams[A].z+=gA; obj.teams[A].p+=gB;
  obj.teams[B].z+=gB; obj.teams[B].p+=gA;

  if(gA>gB){ obj.teams[A].w++; obj.teams[B].l++; }
  else if(gA<gB){ obj.teams[B].w++; obj.teams[A].l++; }
  else { obj.teams[A].d++; obj.teams[B].d++; }

  renderMatches();
  renderTable();
}

function renderMatches(){
  let age=document.getElementById('ageSelect').value;
  let m=document.getElementById('matchList');
  m.innerHTML="";
  if(!data[age]) return;
  data[age].matches.forEach(x=>{
    let div=document.createElement('div');
    div.className="card";
    div.innerText=`${x.A} ${x.gA} : ${x.gB} ${x.B}`;
    m.appendChild(div);
  });
}

function renderTable(){
  let age=document.getElementById('ageSelect').value;
  let body=document.querySelector('#tableStandings tbody');
  body.innerHTML="";
  if(!data[age]) return;
  let arr=[];
  for(let t in data[age].teams){
    let o=data[age].teams[t];
    let pts=o.w*3+o.d;
    arr.push({t,...o,pts});
  }
  arr.sort((a,b)=>b.pts-a.pts || (b.z-b.p)-(a.z-a.p));

  arr.forEach(o=>{
    let tr=document.createElement('tr');
    tr.innerHTML=`<td>${o.t}</td><td>${o.games}</td><td>${o.w}</td><td>${o.d}</td><td>${o.l}</td><td>${o.z}</td><td>${o.p}</td><td>${o.z-o.p}</td><td>${o.pts}</td>`;
    body.appendChild(tr);
  });
}
