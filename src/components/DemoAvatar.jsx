const colors = { Admin: "#fffc00", "Admin": "#fffc00", Rohith: "#8b5cf6", Pranav: "#06b6d4", Santhosh: "#f97316" };
export default function DemoAvatar({ name = "Admin", size = 48 }) { return <span aria-label={`${name} avatar`} className="demoAvatar" style={{ width: size, height: size, background: colors[name] || "#ec4899", fontSize: size * .4 }}>{name[0]}</span>; }
