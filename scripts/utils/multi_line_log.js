import ora from "ora";

class MultiLineLog {
    title;
    spinner;
    logTasks;
    constructor(title, spinner) {
        this.logTasks = [];
        this.title = title || "MultiLineLog";
        this.spinner = spinner || ora().start();
    }

    log = (msg) => {
        let targetTask = this.logTasks.find((t) => t.id === id);
        if (!targetTask) {
            targetTask = { id, msg };
            this.logTasks.push(targetTask);
        }
        targetTask.msg = msg;
        this.spinner.color = "blue";
        this.spinner.text = this.title + "\n" + this.logTasks.map((t) => t.msg).join("\n");
    };

    cancelLogTask = (_id) => {
        const targetTaskIndex = this.logTasks.findIndex((t) => t.id === _id);
        if (targetTaskIndex > -1) {
            this.logTasks.splice(targetTaskIndex, 1);
        }
    };

    end = ()=>{
        this.spinner.stop();
    };


}

export default MultiLineLog;