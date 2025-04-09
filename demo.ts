type Routes = "/home" | "/about" | "/contact";

const goTo = (url: Routes) => {
  window.location.href = url;
};

//goTo("https://google.com")

goTo("/home");
goTo("/about");
goTo("/contact");

let toto = "pojdfpogjdpofgkj";

goTo(toto);
