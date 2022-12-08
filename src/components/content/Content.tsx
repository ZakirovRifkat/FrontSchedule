import style from "./Content.module.css"

const Content = () => {
    return (
        <div className={style.mainContent}>
            <div className={style.form}>
                <div className={style.title}>Проект 1</div>
                <div className={style.taskMargin}>
                    <div className={style.task}>
                        <div>
                            <input className={style.check} type={"checkbox"} />{" "}
                            <span>Задача 1</span>
                        </div>
                        <div>
                            <button className={style.button}>Изменить</button>
                            <button className={style.button}>Удалить</button>
                        </div>
                    </div>
                    <div className={style.subtask}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident illo, numquam quia, saepe mollitia modi
                        excepturi sint, fugiat facilis omnis laboriosam?
                    </div>
                    <div className={style.date}>09.12.2022</div>
                </div>
                <div className={style.taskMargin}>
                    <div className={style.task}>
                        <div>
                            <input className={style.check} type={"checkbox"} />{" "}
                            <span>Задача 1</span>
                        </div>
                        <div>
                            <button className={style.button}>Изменить</button>
                            <button className={style.button}>Удалить</button>
                        </div>
                    </div>
                    <div className={style.subtask}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident illo, numquam quia, saepe mollitia modi
                        excepturi sint, fugiat facilis omnis laboriosam?
                    </div>
                    <div className={style.date}>09.12.2022</div>
                </div>
                <div className={style.taskMargin}>
                    <div className={style.task}>
                        <div>
                            <input className={style.check} type={"checkbox"} />{" "}
                            <span>Задача 1</span>
                        </div>
                        <div>
                            <button className={style.button}>Изменить</button>
                            <button className={style.button}>Удалить</button>
                        </div>
                    </div>
                    <div className={style.subtask}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident illo, numquam quia, saepe mollitia modi
                        excepturi sint, fugiat facilis omnis laboriosam?
                    </div>
                    <div className={style.date}>09.12.2022</div>
                </div>
            </div>
        </div>
    )
}
export default Content
