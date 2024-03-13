// ! modules
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ isActive, children, to = '/' }) {
  return isActive ? children : Navigate({ to: to });
}
