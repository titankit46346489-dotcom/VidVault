// Compact app.js with thumbnail edit support

const SAMPLE_VIDEOS = [
  {id: 'v1', title:'Intro to JavaScript', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/_vSqU8JWL5upWXxJx1_akLBibA5zhuc8T4L84uQC4V8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9qYXZhc2NyaXB0/LXByb2dyYW1taW5n/LWNvZGUtYWJzdHJh/Y3QtdGVjaG5vbG9n/eS1iYWNrZ3JvdW5k/XzI3MjMwNi0xNTUu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw', likes:65, comments:[], uploader:'Admin'},
  {id: 'v2', title:'CSS Grid Tutorial', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/eAhESdjqkgm37DFsguqBenBcx0vU9FzjN_GcmdBWM3U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vd2VzYm9zL2lt/YWdlL2ZldGNoL3df/MzAwLHFfYXV0byxm/X2F1dG8vaHR0cHM6/Ly9jb3Vyc2VzLndl/c2Jvcy5jb20vaW1h/Z2VzL0dSSUQvdGh1/bWJzLzE1LnBuZw', likes:69, comments:[], uploader:'Admin'},
  {id: 'v3', title:'React Basics', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/XywGcVbDgX8GQ53hVTMX4iODx1cTuru4CWFEhIMhmh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93cHZp/cC5jb2RlY2FkZW15/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMi8xMi9XaGF0/LWlzLVJlYWN0LS0x/LnBuZw', likes:43, comments:[], uploader:'Admin'},
  {id: 'v3', title:'Intro to Algorithms', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/7SnhnbQXKkw3k_p6zd8EyARsfrqeC772fzkfEhuzApQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVjaHRhcmdldC5j/b20vcm1zL29ubGlu/ZWltYWdlcy90eXBl/c19vZl9hbGdvcml0/aG1zLWZfbW9iaWxl/LnBuZw', likes:97, comments:[], uploader:'Admin'},
  {id: 'v3', title:'Space Documentary', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/ezi9qFdBzBu6fKpKcR9-X_jQIeh8P2ItyoLluD-geho/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/NTU1MDkyMDY2NDkt/YTYzMzk2YmVkODQw/P2l4bGliPXJiLTQu/MS4wJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4TWpC/OGZHOTFkR1Z5SlRJ/d2MzQmhZMlY4Wlc1/OE1IeDhNSHg4ZkRB/PSZmbT1qcGcmcT02/MCZ3PTMwMDA', likes:43, comments:[], uploader:'Admin'},
  {id: 'v3', title:'Intro to Software Engineering', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/pMT1Yx15HIuPWaIidBzeqmjpOinxIz3XdfZPv4S2114/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zb2Z0/d2FyZS1lbmdpbmVl/cmluZy1jb25jZXB0/LWZsb3djaGFydC1o/YW5kLWRyYXdpbmct/d2hpdGVib2FyZC01/NjIzNzA5MS5qcGc', likes:39, comments:[], uploader:'Admin'},
  {id: 'v3', title:'DSA in C++', url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', thumbnail:'https://imgs.search.brave.com/DO4kQeiC21WBHILelbUgFtH5NLgz5xcbHydxoenbadk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZ3JhbWl6LnBy/by9jb3Vyc2UtbG9n/b3MvZHNhLXdpdGgt/Y3BwLnBuZz93PTI1/NiZxPTc1', likes:87, comments:[], uploader:'Admin'}
];

const ADMIN = {email:'ankit@gmail.com', password:'12345678', name:'Admin'};

function getStore(k,f){const v=localStorage.getItem(k);return v?JSON.parse(v):f;}
function setStore(k,v){localStorage.setItem(k,JSON.stringify(v));}

function init(){
  if(!localStorage.getItem('videos')) setStore('videos', SAMPLE_VIDEOS);
  if(!localStorage.getItem('users')) setStore('users', [{name:ADMIN.name,email:ADMIN.email,password:ADMIN.password,role:'admin'}]);
  if(!localStorage.getItem('playlists')) setStore('playlists', []);
  // ensure thumbnail field
  const vs = getStore('videos',[]); let changed=false;
  vs.forEach(v=>{ if(v.thumbnail===undefined){ v.thumbnail=''; changed=true; }});
  if(changed) setStore('videos',vs);
}
init();

function currentUser(){return getStore('currentUser',null);}
function logout(){
  localStorage.removeItem('currentUser');
  document.body.classList.remove('admin-page'); // ensure admin class cleared
  window.location.href = 'index.html';
}


function signUp(){
  const name=document.getElementById('signupName').value.trim();
  const email=document.getElementById('signupEmail').value.trim();
  const pwd=document.getElementById('signupPassword').value;
  if(!name||!email||!pwd){alert('Fill all');return;}
  const users=getStore('users',[]);
  if(users.find(u=>u.email===email)){alert('Exists');return;}
  users.push({name,email,password:pwd,role:'user'}); setStore('users',users); alert('Created'); location.href='login.html';
}

function login(){
  const email=document.getElementById('loginEmail').value.trim();
  const pwd=document.getElementById('loginPassword').value;
  const role=document.querySelector('input[name="role"]:checked')?.value||'user';
  if(role==='admin'){
    if(email===ADMIN.email && pwd===ADMIN.password){ setStore('currentUser',{name:ADMIN.name,email:ADMIN.email,role:'admin'}); location.href='admin.html'; return;}
    alert('Bad admin'); return;
  }
  const users=getStore('users',[]);
  const u=users.find(x=>x.email===email && x.password===pwd);
  if(!u){alert('Invalid');return;}
  setStore('currentUser',{name:u.name,email:u.email,role:'user'}); location.href='index.html';
}
// Make Enter submit the search form and reuse existing searchVideos()
function searchSubmit(e){
  e.preventDefault();
  // optionally trim or sanitize
  searchVideos();
}

// thumbnails and rendering
function thumbnailFor(v){ return (v.thumbnail && v.thumbnail.trim()!=='')? v.thumbnail : `https://picsum.photos/seed/${v.id}/600/338`; }
// Return thumbnail URL for a video id (falls back to picsum)
function thumbnailForVideoId(videoId){
  const videos = getStore('videos', []);
  const v = videos.find(x => x.id === videoId);
  if(!v) return `https://picsum.photos/seed/${videoId}/600/338`;
  return thumbnailFor(v); // uses existing thumbnailFor(v) helper
}

function canModify(v){ const u=currentUser(); if(!u) return false; return u.role==='admin' || u.name===v.uploader; }

function createCard(v){
  const thumb = thumbnailFor(v);
  const mod = canModify(v);
  return `
  <div class="video-card">
    <div class="video-thumb" onclick="openVideo('${v.id}')"><img src="${thumb}" alt="${v.title}"/></div>
    <h4>${v.title}</h4><small>By ${v.uploader}</small>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button onclick="event.stopPropagation(); toggleLike('${v.id}')">👍 ${v.likes||0}</button>
      <button onclick="event.stopPropagation(); openSavePlaylist('${v.id}')">+ Playlist</button>
      <button onclick="event.stopPropagation(); openVideo('${v.id}')">Watch</button>
      ${mod?`<button style="background:#e11d48;color:white" onclick="event.stopPropagation(); deleteVideo('${v.id}')">Delete</button>`:''}
      ${mod?`<button style="background:#f59e0b;color:#021024" onclick="event.stopPropagation(); promptChangeThumbnail('${v.id}')">Edit Thumbnail</button>`:''}
    </div>
  </div>`;
}

function renderVideos(filterFn){
  const container=document.getElementById('videosGrid')||document.getElementById('topVideos');
  if(!container) return;
  container.innerHTML='';
  const vs=getStore('videos',[]);
  const list= filterFn? vs.filter(filterFn): vs;
  list.forEach(v=>{ const wrap=document.createElement('div'); wrap.innerHTML=createCard(v); container.appendChild(wrap.firstElementChild); });
}

function showAll(){ renderVideos(); }
function filterMine(){ const u=currentUser(); if(!u){alert('Login');return;} renderVideos(v=>v.uploader===u.name); }
function searchVideos(){ const q=(document.getElementById('searchInput')?.value||'').toLowerCase(); renderVideos(v=>v.title.toLowerCase().includes(q)||v.uploader.toLowerCase().includes(q)); }

// video modal
function openVideo(id){
  const vs=getStore('videos',[]); const v=vs.find(x=>x.id===id); if(!v) return;
  currentVideoId=id; document.getElementById('videoModal').classList.remove('hide');
  document.getElementById('modalTitle').innerText=v.title; document.getElementById('modalPlayer').src=v.url;
  document.getElementById('likeCount').innerText=v.likes||0;
  document.getElementById('editThumbBtn').style.display = canModify(v)?'inline-block':'none';
  renderComments(id);
}
function closeVideoModal(){ document.getElementById('videoModal').classList.add('hide'); document.getElementById('modalPlayer').pause(); document.getElementById('modalPlayer').src=''; currentVideoId=null; }

// likes
function toggleLike(id){
  const vs=getStore('videos',[]); const v=vs.find(x=>x.id===id); if(!v){alert('Missing');return;}
  const u=currentUser(); if(!u){alert('Login to like');return;}
  let pls=getStore('playlists',[]); let liked=pls.find(p=>p.name==='__LIKED__' && p.owner===u.email);
  if(!liked){ liked={id:'liked_'+Date.now(),name:'__LIKED__',owner:u.email,videos:[]}; pls.push(liked); }
  if(liked.videos.includes(id)){ liked.videos=liked.videos.filter(x=>x!==id); v.likes=Math.max(0,(v.likes||0)-1);
  } else { liked.videos.push(id); v.likes=(v.likes||0)+1; }
  setStore('playlists',pls); setStore('videos',vs); renderVideos();
  document.getElementById('likeCount') && (document.getElementById('likeCount').innerText=v.likes);
}

// comments
function renderComments(id){ const vs=getStore('videos',[]); const v=vs.find(x=>x.id===id); const list=document.getElementById('commentsList'); if(!list) return; list.innerHTML=''; (v.comments||[]).forEach(c=>{ const d=document.createElement('div'); d.className='comment'; d.innerHTML=`<strong>${c.user}</strong> <small>${new Date(c.time).toLocaleString()}</small><div>${c.text}</div>`; list.appendChild(d); }); }
function postComment(){ const text=document.getElementById('commentText').value.trim(); const u=currentUser(); if(!u){alert('Login to comment');return;} if(!text) return; const vs=getStore('videos',[]); const v=vs.find(x=>x.id===currentVideoId); v.comments=v.comments||[]; v.comments.push({user:u.email,text,time:Date.now()}); setStore('videos',vs); document.getElementById('commentText').value=''; renderComments(currentVideoId); }

// playlists (simple)
function createPlaylist(){ const name=document.getElementById('newPlaylistName')?.value?.trim(); const u=currentUser(); if(!u){alert('Login');return;} if(!name){alert('Enter name');return;} const pls=getStore('playlists',[]); pls.push({id:'pl_'+Date.now(),name,owner:u.email,videos:[]}); setStore('playlists',pls); document.getElementById('newPlaylistName').value=''; loadPlaylistsArea(); alert('Created'); }
function openSavePlaylist(videoId){ const pls=getStore('playlists',[]); const popup=prompt('Enter existing playlist id, or NEW:<name>'); if(!popup) return; if(popup.startsWith('NEW:')){ const name=popup.split('NEW:')[1].trim(); pls.push({id:'pl_'+Date.now(),name,owner:(currentUser()?currentUser().email:'__GUEST__'),videos:[videoId]}); } else { const pl=pls.find(p=>p.id===popup); if(!pl){alert('Not found');return;} if(!pl.videos.includes(videoId)) pl.videos.push(videoId);} setStore('playlists',pls); alert('Saved'); }
function loadLikedPlaylist(){ const u=currentUser(); if(!u){alert('Login');return;} const pls=getStore('playlists',[]); const liked=pls.find(p=>p.name==='__LIKED__' && p.owner===u.email); if(!liked){alert('No liked');return;} const area=document.getElementById('playlistsArea'); area.innerHTML=''; const vs=getStore('videos',[]); liked.videos.forEach(id=>{ const v=vs.find(x=>x.id===id); if(!v) return; const w=document.createElement('div'); w.innerHTML=createCard(v); area.appendChild(w.firstElementChild); }); }
function loadPlaylistsArea(){
  const area = document.getElementById('playlistsArea');
  if(!area) return;
  area.innerHTML = '';
  
  const playlists = getStore('playlists', []);
  const user = currentUser();
  const my = playlists.filter(p=>p.owner === (user ? user.email : '__GUEST__'));

  my.forEach(p=>{
    // pick first video id as playlist thumbnail (if exists)
    const firstVidId = (p.videos && p.videos.length > 0) ? p.videos[0] : null;
    const thumbUrl = firstVidId 
      ? thumbnailForVideoId(firstVidId) 
      : `https://picsum.photos/seed/${p.id}/600/338`;

    // create card element with thumbnail
    const el = document.createElement('div');
    el.className = 'card';
    el.style.maxWidth = '340px';
    el.innerHTML = `
      <div style="display:flex;gap:12px;align-items:flex-start">
        <div style="width:140px;height:80px;border-radius:8px;overflow:hidden;flex:0 0 140px;background:#071427">
          <img src="${thumbUrl}" style="width:100%;height:100%;object-fit:cover" alt="${p.name}" />
        </div>
        <div style="flex:1;">
          <h4 style="margin:0 0 8px 0">${p.name}</h4>
          <p style="margin:0 0 12px 0">${p.videos.length} videos</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button onclick="viewPlaylist('${p.id}')">Open</button>
            <button onclick="deletePlaylist('${p.id}')">Delete</button>
          </div>
        </div>
      </div>
    `;
    area.appendChild(el);
  });
}

function viewPlaylist(id){ const pls=getStore('playlists',[]); const p=pls.find(x=>x.id===id); if(!p) return alert('Not found'); const vs=getStore('videos',[]); const area=document.getElementById('playlistsArea'); area.innerHTML=`<h3>${p.name}</h3>`; p.videos.forEach(vid=>{ const v=vs.find(x=>x.id===vid); if(!v) return; const w=document.createElement('div'); w.innerHTML=createCard(v); area.appendChild(w.firstElementChild); }); }
function deletePlaylist(id){ if(!confirm('Delete?')) return; let pls=getStore('playlists',[]); pls=pls.filter(p=>p.id!==id); setStore('playlists',pls); loadPlaylistsArea(); }

// upload
function openUploadModal(){ document.getElementById('uploadModal').classList.remove('hide'); }
function closeUploadModal(){ document.getElementById('uploadModal').classList.add('hide'); }
function mockUpload(){ const title=document.getElementById('uploadTitle').value.trim(); const url=document.getElementById('uploadUrl').value.trim(); const thumb=document.getElementById('uploadThumb')?.value.trim()||''; if(!title||!url){alert('Enter title/url');return;} const u=currentUser(); if(!u){alert('Login');return;} const vs=getStore('videos',[]); const id='v'+Date.now(); vs.push({id,title,url,thumbnail:thumb,likes:0,comments:[],uploader:u.name}); setStore('videos',vs); closeUploadModal(); renderVideos(); alert('Uploaded'); }

// edit thumbnail after upload
function promptChangeThumbnail(id){ const vs=getStore('videos',[]); const v=vs.find(x=>x.id===id); if(!v) return alert('Not found'); if(!canModify(v)) return alert('No permission'); const newUrl=prompt('Enter new thumbnail URL (blank to remove):', v.thumbnail||''); if(newUrl===null) return; v.thumbnail=newUrl.trim(); setStore('videos',vs); renderVideos(); alert('Thumbnail updated'); }

// delete video
function deleteVideo(id){ const u=currentUser(); if(!u){alert('Login');return;} let vs=getStore('videos',[]); const v=vs.find(x=>x.id===id); if(!v) return alert('Not found'); if(u.role!=='admin' && u.name!==v.uploader){alert('No permission');return;} if(!confirm('Delete?')) return; vs=vs.filter(x=>x.id!==id); setStore('videos',vs); let pls=getStore('playlists',[]); pls.forEach(p=>p.videos=p.videos.filter(x=>x!==id)); setStore('playlists',pls); renderVideos(); if(document.getElementById('playlistsArea')) loadPlaylistsArea(); alert('Deleted'); }

// admin
function renderAdminStats(){ const s=document.getElementById('stats'); if(!s) return; const users=getStore('users',[]); const vs=getStore('videos',[]); const pls=getStore('playlists',[]); const totalLikes=vs.reduce((a,b)=>a+(b.likes||0),0); s.innerHTML=`<div class="stat"><h4>Users</h4><p>${users.length}</p></div><div class="stat"><h4>Videos</h4><p>${vs.length}</p></div><div class="stat"><h4>Playlists</h4><p>${pls.length}</p></div><div class="stat"><h4>Total likes</h4><p>${totalLikes}</p></div>`; const top=document.getElementById('topVideos'); if(top){ top.innerHTML=''; const sorted=[...vs].sort((a,b)=> (b.likes||0)-(a.likes||0)).slice(0,6); sorted.forEach(v=>{ const w=document.createElement('div'); w.innerHTML=createCard(v); top.appendChild(w.firstElementChild); }); } }

// init per page
document.addEventListener('DOMContentLoaded', ()=>{
  // ensure admin-page body class on admin.html (put this as the first lines inside DOMContentLoaded)
// Put this as the first lines inside the DOMContentLoaded callback
// (ensures admin styles apply on index/playlists/admin pages whenever current user is admin)
const _cur = currentUser();
if (_cur && _cur.role === 'admin') {
  document.body.classList.add('admin-page');
} else {
  document.body.classList.remove('admin-page');
}


  if(document.getElementById('videosGrid')){ renderVideos(); const authLink=document.getElementById('authLink'); const u=currentUser(); if(u){ authLink.innerText='Logout'; authLink.href='#'; authLink.onclick=logout; } } if(document.getElementById('playlistsArea')){ loadPlaylistsArea(); const authLink=document.getElementById('authLink'); const u=currentUser(); if(u){ authLink.innerText='Logout'; authLink.href='#'; authLink.onclick=logout; } } if(document.getElementById('stats')){ const u=currentUser(); if(!u||u.role!=='admin'){ alert('Admin only'); location.href='login.html'; return;} renderAdminStats(); } });
