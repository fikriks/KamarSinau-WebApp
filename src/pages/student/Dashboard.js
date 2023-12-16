import { WrapperStudent } from "../../layout/student";
import { useAuthUser } from "react-auth-kit";

const Dashboard = () => {
  const auth = useAuthUser();

  return (
    <WrapperStudent>
      <div className="col-md-10">
        <div className="dasboard-right">
          <h1 className="text-dark">Halo, Selamat Datang {auth().name}</h1>
        </div>
      </div>
    </WrapperStudent>
  );
};

export { Dashboard as StudentDashboard };
