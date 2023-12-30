import { WrapperStudent } from "../../layout/student";
import { useAuthUser } from "react-auth-kit";

const Dashboard = () => {
  const auth = useAuthUser();
  let greeting = "";

  if (auth().level === "SD") {
    greeting = `Halo Adik ${auth().name}, Selamat Datang Di KamarSinau`;
  } else if (auth().level === "SMP") {
    greeting = `Halo Sobat ${auth().name}, Selamat Datang Di KamarSinau`;
  } else if (auth().level === "SMA") {
    greeting = `Halo squad ${auth().name}, Selamat Datang Di KamarSinau`;
  }

  return (
    <WrapperStudent>
      <div className="col-md-10">
        <div className="dasboard-right">
          <h1 className="text-dark">{greeting}</h1>
        </div>
      </div>
    </WrapperStudent>
  );
};

export { Dashboard as StudentDashboard };
