import React, { useEffect, useState, ReactNode } from 'react';
import { Navigate, useParams, useRoutes } from 'react-router-dom';
import {
  ABOUT,
  ACCOUNT,
  CONTACT,
  DASHBOARD,
  FORGOT_PASSWORD,
  HOME,
  PROJECTS,
  SIGNIN,
  SIGNUP,
  SIGNUP_OTP,
  TASKS,
  NOTFOUND,
  CREATE_PROJECTS,
  EDIT_PROJECTS,
  EDIT_TASKS
} from './RouteConstants';
import LandingPageLayout from '../Layout/LandingPageLayout/LandingPageLayout';
import Home from '../pages/landingPage/home/Home';
import About from '../pages/landingPage/about/About';
import Contact from '../pages/landingPage/contact/Contact';
import AuthLayout from '../Layout/AuthLayout/AuthLayout';
import NotFound from '../pages/landingPage/NotFound';
import ForgotPassword from '../pages/authPage/ForgotPassword';
import SignUp from '../pages/authPage/SignUp';
import SignIn from '../pages/authPage/SignIn';
import Dashboard from '../pages/authPage/dashboard/Dashboard';
import Projects from '../pages/authPage/projects/Projects';
import CreateProjects from '../pages/authPage/projects/createProjects/CreateProjects';
import Task from '../pages/authPage/tasks/Task';
import Account from '../pages/authPage/account/Account';
import EditProject from '../pages/authPage/projects/editProjects/EditProjects';
import SignUpOtp from '../pages/authPage/SignUpOtp';
import { tasks } from '../data/taskData';
import EditTask from '../pages/authPage/tasks/editTask/EditTask';
import { useCreateData } from '../contexts/CreateDataContext';

const Routes = () => {
  const { projectData } = useCreateData();
  
  type Props<T> = {
    config: T[];
    children: (data: T | null) => ReactNode;
  };

  const FindIdConfigDetails = <T, >({ config, children }: Props<T>) => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
      const foundItem = config.find((item: any) => {
        return 'id' in item && item.id.toString() === id;
      });
      setData(foundItem || null);
    }, [id, config]);

    return <>{children(data)}</>;
  };

  return useRoutes([
    {
      path: HOME,
      element: <LandingPageLayout />,
      children: [
        {
          path: HOME,
          element: <Home />
        },
        {
          path: ABOUT,
          element: <About />
        },
        {
          path: CONTACT,
          element: <Contact />
        }
      ]
    },
    {
      path: ACCOUNT,
      element: <AuthLayout />,
      children: [
        {
          path: DASHBOARD,
          element: <Dashboard />
        },
        {
          path: PROJECTS,
          element: <Projects />
        },
        {
          path: CREATE_PROJECTS,
          element: <CreateProjects />
        },
        {
          path: `${PROJECTS}/:id/${EDIT_PROJECTS}`,
          element: (
            <FindIdConfigDetails config={projectData}>
              {(data) => <EditProject data={data} />}
            </FindIdConfigDetails>
          )
        },
        {
          path: TASKS,
          element: <Task />
        },
        {
          path: `${TASKS}/:id/${EDIT_TASKS}`,
          element: (
            <FindIdConfigDetails config={tasks}>
              {(data) => <EditTask data={data} />}
            </FindIdConfigDetails>
          )
        },
        {
          path: ACCOUNT,
          element: <Account />
        },
        {
          path: SIGNIN,
          element: <SignIn />
        },
        {
          path: SIGNUP,
          element: <SignUp />
        },
        {
          path: FORGOT_PASSWORD,
          element: <ForgotPassword />
        },
        {
          path: SIGNUP_OTP,
          element: <SignUpOtp />
        },
        {
          path: NOTFOUND,
          element: <NotFound />
        },
        {
          path: '*',
          element: <Navigate to={`/${NOTFOUND}`} replace />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);
};

export default Routes;
