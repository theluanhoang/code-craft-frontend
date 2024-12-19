import "./sidebar.scss";

function Sidebar() {
  return (
    <section className="sidebar">
        <div className="subject">
            <h2 className="subject-title">Github Tutorial</h2>
            <ul className="subject-menu ">
                <li className="subject-menu-item">
                    Commit
                </li>
                <li className="subject-menu-item">
                    Rebase
                </li>
                <li className="subject-menu-item">
                    Merge
                </li>
                <li className="subject-menu-item">
                    Push
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Sidebar