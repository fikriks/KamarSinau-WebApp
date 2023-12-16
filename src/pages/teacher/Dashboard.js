import { WrapperTeacher } from "../../layout/teacher";
import { useAuthUser } from "react-auth-kit";

const Dashboard = () => {
    const auth = useAuthUser();
    
    return (
       <WrapperTeacher>
          <div className="col-md-10">
          <div className="dasboard-right">
              <h1 className="text-dark">
              Halo, Selamat Datang {auth().name}
              </h1>
          </div>
          </div>
       </WrapperTeacher>
     );
};

export {Dashboard as TeacherDashboard};
