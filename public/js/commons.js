document.querySelector('head').innerHTML += '<link rel="stylesheet" href="styles.css" type="text/css"/>';

async function requestExternalImage(imageUrl) {
  const res = await fetch("fetch_external_image", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ imageUrl }),
  });
  if (!(res.status < 400)) {
    console.error(res.status + " : " + (await res.text()));
    throw new Error("failed to fetch image from url: " + imageUrl);
  }

  let blob;
  try {
    blob = await res.blob();
    return await faceapi.bufferToImage(blob);
  } catch (e) {
    console.error("received blob:", blob);
    console.error("error:", e);
    throw new Error("failed to load image from url: " + imageUrl);
  }
}

function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: "face_menu",
      name: "Face Menu",
    },
    {
      uri: "face_detection",
      name: "Face Detection",
    },
    {
      uri: "face_landmark_detection",
      name: "Face Landmark Detection",
    },
    {
      uri: "face_expression_recognition",
      name: "Face Expression Recognition",
    },
    {
      uri: "age_and_gender_recognition",
      name: "Age and Gender Recognition",
    },
    {
      uri: "face_recognition",
      name: "Face Recognition",
    },
    {
      uri: "face_extraction",
      name: "Face Extraction",
    },
    {
      uri: "video_face_tracking",
      name: "Video Face Tracking",
    },
    {
      uri: "webcam_face_detection",
      name: "Webcam Face Detection",
    },
    {
      uri: "webcam_face_landmark_detection",
      name: "Webcam Face Landmark Detection",
    },
    {
      uri: "webcam_face_expression_recognition",
      name: "Webcam Face Expression Recognition",
    },
    {
      uri: "webcam_age_and_gender_recognition",
      name: "Webcam Age and Gender Recognition",
    },
    {
      uri: "bbt_face_landmark_detection",
      name: "BBT Face Landmark Detection",
    },
    {
      uri: "bbt_face_similarity",
      name: "BBT Face Similarity",
    },
    {
      uri: "bbt_face_matching",
      name: "BBT Face Matching",
    },
    {
      uri: "bbt_face_recognition",
      name: "BBT Face Recognition",
    },
    {
      uri: "batch_face_landmarks",
      name: "Batch Face Landmark Detection",
    },
    {
      uri: "batch_face_recognition",
      name: "Batch Face Recognition",
    },
    {
      uri: "face_filter",
      name: "Webcam Filter",
    },
  ];

  const navbar = $(navbarId).get(0);  
  const pageContainer = $(".page-container").get(0);
  
  // const header = document.createElement("h5");
  // header.classList.add("card-panel","blue-text","center-content");
  // header.style.width="500px"
  // header.style.height="30px"
  // header.innerHTML = examples.find((ex) => ex.uri === exampleUri).name;
  // pageContainer.insertBefore(header, pageContainer.children[0]);

  const menuContent = document.createElement("ul");
  menuContent.id = "slide-out";
  menuContent.classList.add("side-nav","fixed");

  
  const faceDropDown = document.createElement("ul");

  faceDropDown.classList.add("collapsible");
  
  
  navbar.appendChild(menuContent);
  const menuButton = document.createElement("a");

  menuButton.href = "#";
  menuButton.classList.add("button-collapse", "show-on-large");
  menuButton.setAttribute("data-activates", "slide-out");
  
  const menuButtonIcon = document.createElement("img");
  menuButtonIcon.src = "menu_icon.png";
  menuButtonIcon.style.width="40px"
  menuButton.appendChild(menuButtonIcon);
  menuButton.style.marginTop='90px'
  menuButton.style.marginLeft='40px'
  menuButton.style.zIndex='20';
  // menuButtonIcon.style.backgroundColor='white'

  navbar.appendChild(menuButton);

  const li = document.createElement("li");
  
  const githubLink = document.createElement("a");
  githubLink.style.height= '100px'

  githubLink.style.borderBottom='1px solid #A8A8A8'
  githubLink.classList.add("waves-effect", "waves-light", "side-by-side");
  githubLink.id = "github-link";
  //githubLink.href = "https://github.com/justadudewhohacks/face-api.js";
  const h5 = document.createElement("h5");
  h5.innerHTML = "<div class='h5' style='margin-top:15px' ><img src='https://icon-library.com/images/facial-recognition-icon/facial-recognition-icon-26.jpg' width='50px' height='50px'  /><h5 style='color:#2E479C;font-family:Verdana;font-weight:bold';>Detect Face</h5></div>";
  // h5.style.paddingTop="7px"
  h5.style.textAlign='center'
  
  githubLink.appendChild(h5);
  // const githubLinkIcon = document.createElement("img");
  // githubLinkIcon.src = "github_link_icon.png";
  // githubLink.appendChild(githubLinkIcon);
  li.appendChild(githubLink);
  menuContent.appendChild(li);

  examples.forEach((ex) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("waves-effect", "waves-light", "pad-sides-sm");
    a.style.fontSize="13px";
    // a.style.marginBottom="-19px"
    if (ex.uri === exampleUri) {
      li.style.background = "#00c3ed";
      a.style.color="white"
    }
    
    // a.style.marginLeft="10px"
    // a.style.paddingLeft="20px"
    a.href = ex.uri;
    const span = document.createElement("span");
    span.innerHTML = ex.name;
    span.style.whiteSpace = "nowrap";
    span.style.paddingLeft="15px"
    
    a.appendChild(span);
    li.appendChild(a);
    menuContent.appendChild(li);
    
    
    
  });

  $(".button-collapse").sideNav({
    menuWidth: 280,
  });
}

function renderSelectList(
  selectListId,
  onChange,
  initialValue,
  renderChildren
) {
  const select = document.createElement("select");
  $(selectListId).get(0).appendChild(select);
  renderChildren(select);
  $(select).val(initialValue);
  $(select).on("change", (e) => onChange(e.target.value));
  $(select).material_select();
}

function renderOption(parent, text, value) {
  const option = document.createElement("option");
  option.innerHTML = text;
  option.value = value;
  parent.appendChild(option);
}

