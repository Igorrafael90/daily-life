import jsPDF from "jspdf";
import "jspdf-autotable"
import { Tasks, Lists } from "./interface";
import autoTable from "jspdf-autotable";

export const ExportPDF = (lists: Lists[], tasks: Tasks[]) => {
    const doc = new jsPDF()
    let y = 15

    doc.setFontSize(16)
    doc.text("Minhas listas e tarefas", 14, y)
    y += 10

    lists.forEach((list) => {
        doc.setFontSize(14)
        doc.text(list.Title, 14, y)
        y += 6

        const listTasks = tasks.filter((t) => t.listId === list.id)

        if(listTasks.length > 0) {
            const tabletask = listTasks.map((task) => [
                task.Title,
                task.Content,
                task.Priority,
            ])

        
        autoTable(doc, {
            head: [["Título", "Descrição", "Prioridade"]],
            body: tabletask,
            startY: y,
            theme: "striped",
            styles: {fontSize: 10},
        })

        y = (doc as any).lastAutoTable.finalY + 10
        } else {
            doc.setFontSize(12)
            doc.text("Sem tarefas nesta lista", 14, y)
            y += 10
        }
    })

    doc.save("listas_e_tarefas.pdf")
}