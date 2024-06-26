import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { LogoSvg, previous } from "../../assets/icons";
// import { Link } from "react-router-dom";
import api from "../../config/api/index.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../config/reducer/authSlice.js";
import { Loading } from "../../components/loading/index.jsx";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.authSlice)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-abu-abu">
      <div className="w-full flex p-5 justify-around h-screen mx-auto">
        <div className="w-1/2 bg-login bg-cover p-10 box-border rounded-md max-lg:hidden">
          <div className="flex h-full flex-col justify-between">
            <div>
              <img src={LogoSvg} alt="logo" />
            </div>
            <div className="flex-grow flex items-center">
              <p className="text-white text-4xl font-bold leading-snug">
                Temukan developer berbakat & terbaik di berbagai bidang keahlian
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-10 w-1/2 h-full pl-10 max-lg:pl-0 max-lg:w-full">
          <Link to="/" className="font-semibold flex items-center gap-x-3">
            <img className="w-8 h-8" src={previous} />
            <p>Kembali</p>
          </Link>

          <div className="flex flex-col justify-between">
            <p className=" text-3xl font-semibold max-lg:text-2xl">
              Halo, Pewpeople
            </p>
            <p className="text-lg capitalize">login dan temui talent terbaik</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <div className="mb-5">
                <label className="text-sm text-abu-gelap">Email</label>
                <input
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  className="bg-white p-0 w-full h-12 rounded-lg text-sm border-none outline-none indent-4"
                  type="email"
                  placeholder="Masukkan alamat email"
                />
              </div>
              <div className="mb-5">
                <label className="text-sm text-abu-gelap">Kata Sandi</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  test-id="test"
                  className="bg-white p-0 w-full h-12 rounded-lg text-sm border-none outline-none indent-4"
                  placeholder="Masukkan kata sandi"
                />
              </div>
            </div>
            <button className="w-full h-12 border-none text-lg text-white bg-orange-gelap cursor-pointer rounded-lg text-center hover:bg-orange-terang flex items-center justify-center">
              {loading ? <Loading /> : <>Masuk</>}
            </button>
          </form>
          <div>
            <div className="mb-5 text-right text-sm">
              <a href="#">Lupa Kata Sandi?</a>
            </div>
            <div>
              <p className=" text-center text-lg">
                Anda belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-orange-gelap hover:text-orange-terang"
                  href="#"
                >
                  Daftar disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
