const upload = document.getElementById("upload");
const original = document.getElementById("original");
const button = document.getElementById("generate");
const items = document.querySelectorAll(".item");

let image = new Image();

upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    original.src = reader.result;
    original.style.display = "block";

    // reset visual
    items.forEach(item => item.classList.remove("active"));
  };
  reader.readAsDataURL(file);
});

button.addEventListener("click", () => {
  if (!image.src) return alert("Envie uma imagem primeiro");

  const sliceWidth = image.width / 3;
  const height = image.height;

  items.forEach((item, index) => {
    const canvas = item.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = sliceWidth;
    canvas.height = height;

    ctx.drawImage(
      image,
      sliceWidth * index,
      0,
      sliceWidth,
      height,
      0,
      0,
      sliceWidth,
      height
    );

    // ativa o botão quando a imagem aparece
    item.classList.add("active");

    const downloadBtn = item.querySelector(".download");
    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.download = `carrossel_${index + 1}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  });
});