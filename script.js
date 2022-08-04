"use strict";

let myLibrary = [];
const submitBtn = document.getElementById("submit");
const display = document.querySelector(".display");
const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form-container");

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

submitBtn.addEventListener("click", function (e) {
  //Hide form
  form.classList.add("hidden");
  e.preventDefault();

  //Getting values from form
  const titleVal = document.querySelector("#title").value;
  const authorVal = document.querySelector("#author").value;
  const pagesVal = document.querySelector("#pages").value;
  const readVal = document.querySelector("#read").checked;

  let newBook = new Book(titleVal, authorVal, pagesVal, readVal);
  myLibrary.push(newBook);
  //   console.log(myLibrary);
  const divTitle = document.createElement("div");
  divTitle.innerText = `Title: ${newBook.title}
  Author: ${newBook.author}
  Pages:  ${newBook.pages}  `;
  display.appendChild(divTitle);
  divTitle.classList.add("divStyle");

  //Add remove button
  const btnRemove = document.createElement("button");
  btnRemove.textContent = "X";
  btnRemove.setAttribute("data", `${myLibrary.length - 1}`);
  btnRemove.classList.add("btnStyle");
  divTitle.appendChild(btnRemove);

  //Add read button
  const btnRead = document.createElement("button");
  btnRead.textContent = `${readVal ? "read" : "unread"}`;
  btnRead.setAttribute("data", `${myLibrary.length - 1}`);
  divTitle.appendChild(btnRead);

  //Display read state
  if (btnRead.textContent === "read") {
    btnRead.classList.add("btnRead");
  } else {
    btnRead.classList.add("btnUnread");
  }

  //Remove Book
  btnRemove.addEventListener("click", function (e) {
    const bookIndex = e.target.getAttribute("data");
    myLibrary.splice(bookIndex, 1);
    e.target.parentElement.remove();
  });

  //Changing Read State
  btnRead.addEventListener("click", function (e) {
    if (btnRead.classList.contains("btnRead")) {
      e.target.textContent = "unread";
      btnRead.classList.remove("btnRead");
      btnRead.classList.add("btnUnread");
    } else {
      e.target.textContent = "read";
      btnRead.classList.add("btnRead");
      btnRead.classList.remove("btnUnread");
    }
  });
});

newBookBtn.addEventListener("click", function () {
  //Clear input fields
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = "";

  //Remove form
  form.classList.remove("hidden");
});
