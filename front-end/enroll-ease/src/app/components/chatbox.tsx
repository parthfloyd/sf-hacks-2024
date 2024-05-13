import styles from './chatbox.module.css';

export default function Chatbox() {
    return(
        <div className={styles.container}>
		<div className={styles.chat_box}>
			<div className={styles.head}>
				<div className={styles.user}>
					<div className={styles.avatar}>
						<img src="https://picsum.photos/g/40/40" />
					</div>
					<div className={styles.name}>Parth Panchal</div>
				</div>
				<ul className={styles.bar_tool}>
					<li><span className={styles.alink}><i className="fas fa-phone"></i></span></li>
					<li><span className={styles.alink}><i className="fas fa-video"></i></span></li>
					<li><span className={styles.alink}><i className="fas fa-ellipsis-v"></i></span></li>
				</ul>
			</div>
			<div className={styles.body}>
				<div className={styles.incoming}>
					<div className={styles.bubble}>
						<p>Hello Enrollment Agent</p>
					</div>
					<div className={styles.bubble}>
						<p>I want to ask how can I enroll classes </p>
					</div>
				</div>
				<div className={styles.outgoing}>
					<div className={[styles.bubble, styles.lower].join(" ")}>
						<p>If you are already admitted to the SFSU</p>
					</div>
					<div className={styles.bubble}>
						<p>You can login to the gateway and do the following steps...</p>
					</div>
				</div>
				<div className={styles.typing}>
					<div className={styles.bubble}>
						<div className={[styles.ellipsis, styles.dot_1].join(" ")}></div>
						<div className={[styles.ellipsis, styles.dot_2].join(" ")}></div>
						<div className={[styles.ellipsis, styles.dot_3].join(" ")}></div>
					</div>
				</div>
			</div>
			<div className={styles.foot}>
				<input type="text" className={[styles.msg, styles.buttonText, styles.buttonRegular].join(" ")} placeholder="Type a message..." />
				<button type="submit" className={styles.buttonRegular}><i className="fas fa-paper-plane"></i></button>
			</div>
		</div>
	</div>
    );
}