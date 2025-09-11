const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListul = document.querySelector("#todo-list");

let tasks = [];

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const taskTitle = taskTitleInput.value;
  if (taskTitle.length < 2) {
    aler("Sua tarefa deve ter no minimo 3 caracteres");
    return;
  }
  //adicionando a nova tarefa no array
  tasks.push({
    title: taskTitle,
    done: false,
  });
  //salvando no local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //adicionando a nova tarefa no html
  const li = document.createElement("li");
  li.classList.add("List-item");

  const input = document.createElement("input"); //criando um input
  input.setAttribute("type", "checkbox"); // adicionando a tipagem de checkbox ao input
  input.classList.add("checkbox");
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;

    const spanToToggle = liToToggle.querySelector("span");

    const done = event.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }
    // alterando se a tarefa foi concluida ou nao dentro do array de tarefas
    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t; // se a tarefa nao for a que foi clicada, retorna ela mesma
    });
  });

  const span = document.createElement("span");
  //criando um span
  span.textContent = taskTitle; //adicionando o texto da tarefa ao span
  span.classList.add("task-title");

  const button = document.createElement("button"); //criando um botao
  button.textContent = "Remover"; //adicionando um texto ao botao
  button.classList.add("remove-button");
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;
    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove);
    // removendo a tarefa do array de tarefas

    todoListul.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }); //adicionando a logica do botao de remover a tarefa

  //Passando para o html atravees do appendChild
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListul.appendChild(li);

  taskTitleInput.value = "";
});
//evita o comportamento padrao de um formulario de carregar a página ao submeter
