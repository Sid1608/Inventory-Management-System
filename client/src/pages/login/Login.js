import React from 'react'
import './Login.css';
import { LockClosedIcon } from '@heroicons/react/solid'
import { useRef } from "react"
import axios from 'axios';

export default function Login({setIsLoggedIn, setIsAdmin}){
    const userInputRef = useRef();
    const passInputRef = useRef();
    async function submitHandler(e){
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/auth/login", {
                username: userInputRef.current.value,
                password: passInputRef.current.value,
            })
            .then(response => {
                if(response.data.status === 'admin'){
                    setIsAdmin(true)
                    localStorage.setItem("isAdmin", "true")
                }
                else{
                    setIsAdmin(false)
                    localStorage.setItem("isAdmin", "false")
                }
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem('username', response.data.user.username)
                localStorage.setItem("name", response.data.user.name)
                localStorage.setItem("department", response.data.user.department)
                localStorage.setItem("userId", response.data.user._id)
                setIsLoggedIn(true)
                console.log(response)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login-container">
            <div className="login-card">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAACYCAMAAAC4aCDgAAAAn1BMVEX///8pquLyZjEAod8ApODyXyTxXBwAouAfqOEAn9/7z8P3rZhivOjxXR/z+v3xVwz71cvJ5vbyYinr9vz1j27B4/X8/v+53/TxWRWGyez4tqXa7vm03fPl9PvS6/hywur95+H5w7Oi1fCOze1CseRPteab0u/xTwD83NNbuuduwOmUz+59xeut2fL+8e3829H2o4r2m3/3sJzzcUL+9vNlSHxMAAAQtElEQVR4nO2da4ObNhaGYaUWkbpKWBYIxeCpDU49hmS3zf//baujGwKEb8N4PIneD7kgIcRj6Ug6R7I9z8nJycnJycnJ6WfX04exvvHrk8sfvtqzf3rT6j+Unr78OtaXD+z6fz9Orv/OLn+1ZP/zrd/hYfTX53+N9csf7Pp//j25/pFdfrJk/+2t3+Fh9O1XB3MxfboOpq0hO5hKDuaC+nAdTJtVcDCVHMwF5WAuqCth2kysg6nkYC4oB3NBOZu5oBzMBeVgLii3AlpQDuaCcl6jBeX8mQtq1tM+uf75F8952s/o6dNQ3779xa9/+/ZtlPLVlv3Tp7/etPpOTk436/ufEz3B9U/T629az3eh/338faRfP3swAI0v//7lj7eu68PLTY0WlIO5oNxyckE5mAvKueAWlIO5oBzMBeUCagvKwVxQDuaCcjZzQS0Os8vbzfPquZxLp912vz8e59KjLSRvU+NSyUvM05k7Bs+NjAfled6CNhuWwHSIxkmQwpNWlXh4ztUqbYSeZSYo47A+UYelYVaIgPBhLsMKY8gQJDO381TcGtfq6aWpkoA/l/RXMkzGUp/HfpLkG086LUTnK7H0CijCPog0cxlWhGfwsbVtqttXxrVa3IFPvIXnNTJT33738kG9dAn5NIlfn1y2yF5vodeCOd8yZY1Jfep2E6Yv7iC7E48tsH8epm6Zuyk18aRLYMbztVjaa3QxTJ/Y+q26/dm4pm84YTVbMnnVLfTZHiTx+26+mySJT/YVYH7x7gLTxxZbrm7fGNewyr+dfSrVefpOWJC6rjWw2jesbjRJEq3ev6Cfn7I2f3/5PNLHf9jl7+Ornz/zyPBZVZfaTN9qfk7BlKOETVsNsxgmKOsICEYNWxtvTyfV2JTuEYOrwam3f5qIX/4+ufz1VCla18C0mE0LzFSB8nE3V6huUrgaJuTT7j+uiGFmiyQCVfzPSI5ppGb/T5IkY+q6rpgU9Hq6BqbFbFpg6i483zSTnnc0TLkE5pmazr/Kq+sqmD7ORqkWmDGezy7V9HZ4NH19CczDYjD//G2svy+67zqYE7NpgVn2MO3TKT0vsuA2beZIz3eD+fTll7E+XkTzSphjPBaYBqpJLxZqjTFtZFYfA+atU6MrYfo4H6SegWltmtTMMJo+LQFzdpZ3qe4Gc2TlLDArbOauxuUZ8yK48ThM283D3NytZd68nCwuhalnccQcGywwIxPmYJ0pZU61x2vOl8BslmqZN3uNLoVJDpqmmdUCMzFhTmblY9hDq6Fhkh8aJk7Uy/h436daYK6x2ZQHq3aug2k3Bksn7+eBqVxrA0NogdlJmHLAGE+mxMyJyKX22AycgKnmAGSSIvWOYGb9BJL4ekVnganGF1XyaNXEx2vyvLG/+QUt8yxMi5m+TjcH1K6AqTuw0XctMJVfUt854EL5RRy19qH3uEDLnBiWa3UXmF6rnT1qrh1Nm5/gwdblatY1GGN4u2WJufJKDJ/2Epj1w7RM+8LPG8I0zKYcpC0wdwqmbiomGD4usSFMwRz5Qi6AOevYWwzmi23mZTB7synzW2CKl4YMcpI0Hf1xrKldDnMGfy8FczOX4VLdCaaX6Y4u8FlgbjRM/Xq9B5LPi+B1lWUdxTbeN8zyOpiG2eTLSgtMcQM3wnKW1McvxNNgaqUmUCNq57s5OWszT8eYL9DNy8lrYfZmky8rLTDFpFzMeYi2n0JiXgTPUjMDfC3M8wPQO4Kpfb+87c3D5MPAXjZNGYqT8yKYCqhF58gL/BKY/lIwb/YaXQxTO4v02htChBaYYgwXsz06LF3M57mZVCv00QLpJSsg1TLzuQyX6unj3WB6uaYZ2WCKd5LDQD64m7cd8bLKUTdyhLwEpr8UzO//fBzp868XnUS9AaY2m4Sk8zDFK8Vm8aJNi7aot3QMHZ4XwJx1dCwGk+Ec6cLbboEZq+0VZGWBKd5JOSqVuwPiF2JeJFbjGuYwovYSr9GCMG/ULTB7s0maidFPZYp0oRvLVTkvEgWpcWwUUXuJc/iSPU6vq/gWmL3ZVA3JgClfSS17pPuSdWdhP6XJU4Gg0Z6bnxGmEfkew1QDuJqo9/vksNli1b6PUXjyJQG1dwszPgezh6Tn0mKSKadCqWrT+0G5PyVMLwpmYMZjmIMwhnYGp+rO4asvAfM4l+HVdStM7zgTFyuHix5PrSn9UTH2KfZLtseourxDmAOzaSCRw7eR34iTGy4f+0r6RMs8C1MZjvcI09igZcKUSxtjYwztqRsvqiZVQ4fZdVsKh3oYmGPVvi9DKbMw+5DQAKYcvc2VTb+/32Ck9l8M/eIv6eYPBHNy5kO2rXmYxs6Z0zD7Z6wmN/fBJ3rcbreNJrLftfqRMSTpReyeJdk2hNnnB/fUTMv09RByAibVQ4sBU8UqTAeGnm8bhOXg3NuXjh/q0R+PPuzjwWBH+l3WkIRtVul9w+yDGAbMzALTFhtRjnNN7JqjK9bYxTuHqUd0A6YKVQz8lMJADo5fKOuoPWoWmPOHqix+uJllwD0V40lFFUzhgjgJU91twMzFEbxgMIJEeHLy7iiP6unxpBt/rOREy7Q5NVWBbwczrWdPHQoc6qXtZ5MiMXAZvp9tzTUKXm/g2n54p8iop0bF4CAknDrRSdUkybZkzEWBtWVL6M+plIkKxfTiJCcnJycnJycnJycnJyenH0bFPb+EYRmVUXXi+2HuqyrvVXjzcTVQtlM+MZrnItJStuCj2efSUxnnbe+z6aDM2W+QSWNR2A68d9TC4zJvxgqF4Yt3ty4l40vDgsTzTx4v3gTq/SjGiIdhqhBcyDWWvuAWG/HyvCGkmd2SVoSCM482HsPJF9Ok6JIjKFt0jIvH8bmlaeqtGUf4+wzMFvcwc9GIKwSezKb2eeugQTPYiFXPfxmPV6BOPt8DJlOYF500a052pTfRGkk/OoOZJmv1SdOsS8wgtQlz3/F7BMx6dUTQUY8kC6Yw05J65Xote3KcrCNWDE2CfVwyhDG7TndBFZcxzylvSEuyorEwBdE6G7JOky7hOeO6oeXDmEyhDElPud90QYgC0cF2KCDI3D9pwtx5/DyUhNnQIIedbdvEArMK988hQiJlgxAOUettQx8jFFKvIax9YT9AYe2VIbfEBfurCAlh6Ql83VZIgoFdzHCIEWxmopApnA2kv416mIR0RXUI4L+7cEvT+GB0wCHMDq17mDxtizxby6wwbpIyIXD3EbFCy93Bi9c4r6oq9Q4sT5HjrKoKL0Y8slGgrZdG5FBUFWX/WcVpukd9zCNCTZmWB9Yz0sqvWSGvieZ69TC5CSoD1g5i0Upo0IdbhjBZ00x7mDE6emRnhymK2MOQ1QgrmvY2E2Aqm2nA9Dy5caau+2xCjdggw+taP57NNLo5/ytgtr8Lohjk9yfCRzAz9s4apvdMtkFsh4nW4iEJfLVpJ63wAOaem9wBzFTApGiXslrQvJ9JIHmQAz6AdwJzx6wRKOgH+BFMNiMyYBYYjlPaYXJsCcAscICbHDrmCOakZUqYrFheDTCvQgUSU9wttPSHhNmP5iAOEwZYUD9YjmFG6FhomN4qjM/D9Gi3qRHK52CKAUjA5FOjIjiKamjT3cOs3g3MDk02R41hMuuVBBpmCfmHMH2zmyfqIV4J2y/tMHmxJswYjdc3FIkJ6ON28ynMEsn+Pd8yWbOpsYYpSpq3mRymaF85s66FHJ/lAMSdAlRMypKAD0Ci0FruLqR6xluLajzuADSFyT75Q0Xj5NAvCFvcZVwKprciY5ioh1mWtV+UQ5g4Lyib9QAC7Fc0ElMjlmUVxzDY421ZtYhvSjrgNS1i2M2RxbTa9Rti+qnRQ8JchxKmdHSE8kguM/uI9LP2DQ4QKGCzZYG4QLyz9q+UhT3MVcgGjwYm7cJmhhnM2UMchA00tjWbp8tJO5sLsH/XMNywiXrd8WV7CSMgq1dVs1qEweCbkxBGvPXKudxDiZay/8rRRv6VVlli+uRoLKXWfcwG8H/E8aQkniaGL5lZJNFKrw1pksByUvyvTCIoJM26Sq8qo6TgfbtIsmqw95qq5aTxZCcnJycnJycnp3ehan889bNEr664O/HTM1LR7C8UvJXSujk0k031bElHTv4qhF00EQjI7AFHpQZ0OMCf1gBmFZ7/LPPw6gq+trY7vNqOmkGB2tS7YRd+JeO3TX0OJv9RLuLD73NZj5pUKLNdHii/4eN+bZVoslOgm4ZeL5Lyq10oPB/Nfa8wRcjFqxIv3rc7oFjluEsyaJnrvN2KiEIWe3GUeJStrLs2j9hnIDOzpGOe87ZdbnGbZFkKZfEid+1OGJCk8iJW1Ki9YrnPoDi2uWSXrnd5FwPMBJ6TqGevc5WDVVL+M8f6buV7ZfXt4qxga3xpuBL7b7+9mqRnsQ3yMMBBUEGkxkcojLzYD+sG8cNpSbjOIXZQhJs6JCjo9mFAAn5C8hgGNcvPCulU/HbFX3MT4gZz526Km0NI8Pj8qIS5C/3nOmyAdEVCv0Zh5kW4JfAc8KpXYevDv7lxzYKg8UMfPmkBc8eeQoSfK64RrhF3KNWIf3BVeOcD0wom9hM4lAsBtH1QQASxhmO4tIajexEjsa7WaYHxjjLKGFxzGT9EFkEjoA3kUt38GfxqW+43z7nb3MfwY4ybYNh3BUzhcYsgd4z9EnYydfC8PTwHjghWGB/Zv7mbuEQNVbXkMNf809rzWIZwVXcQUs9ETTanfxZveWmY/Lm14ABNrhIJFbxmJEO+MnMe8B5uuBMzCHMMYOofOoMYBI9xlsFw5BYwfdE+VwSKFb0zZWw59z0EemQQiQdS5INzqCCHWQuvMcR/KxX16NTT6STo8doawlz1MPmbeCKAEElnvDSwMmgj4hJ0na+aGhswoZBSvBp771gFdCi2wCyDlrvvVwE1NidJmPwjMl31MkcE1QCYVJ6w3LMa70XwQ1TiCJWXV+6oWZi5iGbzF7DD5HsK1jioN8fNGGYlJwlQViq+A8EKU50yhRPR/cYxCTMZw5SRIR6iBJglEkVC5EXWV1Qihrjb6Y1or6EhzGfoOwLmTk6QoDOPYG57mMyKwTsk426uImZHDnO+ZVZG2Kg3G3MtU+bQMGNpOcAGyPrKSqww7QOid9MIZt8yxUY3L4WY4TxMuYWOZ5CpvBAVkmUvdRImDfrZ5kGPF3MwD+IQ+hqSYZ6ZyqbaMlvaifFNwmSWoJn9rs1Xk5y0T2HGYjfHHio+D1OOm3kQ9Z2OF9LwIG0JxE51c+8gR50IPj6xwamahdmJ5zdQWT4AbXhVKcy6KKrZ1fJZfttXff9z/Gm3x8+weXLazRnGVVTlHOm8zaSY7JOtj/m3zfh4m7BpDDe8BfbXRUdg+NUwh4OrgFlinCfJlg/LNdokyY59PHMwvTrYVVHDa8Fhxph0RebzsXKLcFOHtYTZ4XvPi9h71nVNWFVyPhH2NnyHhdxWvSVhiFv+HcFEwiSdSOAZDsC58lGIjwkBmAWbM7NXaLllKyBI28DHkoovPKD+sGWK/cYebeExDRBLd+yfZFOy2Tt/XgI1q0S4OeGX0k0Qhj6ne+Qje9lAmFg27s1hEynDTYOH2ewuFZcXfLpl2a8TKTXWjBfdzZQaX24gtwvPa7JXeHQhkRt77j8v+qHEP7pU7t/03vDXPH8EHVGzWWHpb9LbVJxuUtU2dZPLzp2/+HeBnJycnJycnJycnO6v/wOkB60tGUoziAAAAABJRU5ErkJggg=="/>
                {/* <span className="college-logo">LNMIIT</span> */}
                <span className="name">Inventory Management System</span>
                <div className="login-form ">
                <form className="mt-8 space-y-8 w-full" onSubmit={submitHandler}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div style={{marginTop:"-20px"}} className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <input
                        id="username"
                        name="username"
                        required
                        className="form-input  appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                        ref={userInputRef}
                        />
                    </div>
                    <div>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="form-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        ref={passInputRef}
                        />
                    </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                </button>
                </div>
                </form>
                </div>
            </div>
        </div>
    )
}