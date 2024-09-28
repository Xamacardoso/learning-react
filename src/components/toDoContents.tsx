"use-client";

import { useRef, useState, useEffect } from "react";
import AddToDoItem from "./addToDo";
import { IToDoItem } from "./todoItem";
import Task from "./todoItem";
import { ULID } from "ulidx";

export default function ToDoContents() {
  // Para reconhecer o input
  const inputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<IToDoItem[]>([]); // data é uma array de interfaces de itens de tasks

  // Função para verificar se localStorage está disponível
  function isLocalStorageAvailable() {
    const testKey = "xama";
    const testValue = "xamapicudo";

    // Tenta adicionar e pegar os valores da chave xama, pra ver se nao tem nenhum erro
    try {
      localStorage.setItem(testKey, testValue);
      const isAvailable = localStorage.getItem(testKey) === testValue;
      localStorage.removeItem(testKey);
      return isAvailable;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const storedData = localStorage.getItem("data");
      if (storedData) {
        setData(JSON.parse(storedData) as IToDoItem[]);
      }
    } else {
      console.log("localStorage não está disponível");
    }
  }, []);

  useEffect(() => {
    console.log("Saving data: ", data);
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // Filtra a nova array a partir de data
  function handleDeletion(id: ULID) {
    const newData = data.filter((item) => item.id !== id);
    setData(newData); // Seta data para atualizar a lista de data
  }

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-4xl">PINDAMONHAHNGABA TASKS</h1>
      <div>
        <AddToDoItem inputRef={inputRef} tasks={data} setTasks={setData} />
        <div className="mr-2 min-h-screen pt-10 gap-2 font-[family-name:var(--font-geist-sans)]">
          {data.length > 0 ? (
            data.map((a) => (
              <Task handleDelete={handleDeletion} key={a.id} toDoItem={a} />
            ))
          ) : (
            <p>Sem nada</p>
          )}
        </div>
      </div>
    </div>
  );
}
