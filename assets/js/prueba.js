fetch("./datos.json")
  .then(res => res.json())
  .then(dat => console.log(dat))
  .catch(error => console.info(error))