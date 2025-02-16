
let h1 = React.createElement('h1', null , "hello from react ");
let parent = document.querySelector("#parent");
console.log(parent);
let root =  ReactDOM.createRoot(parent);
root.render(h1);

