import { OkPacket } from "mysql";
import { format } from "mysql2";
import { get } from "../loaders/mysql";

export  function Query<T = OkPacket>(sql: string, values?: any): Promise<any>{
    return new Promise((resolve, reject) => {
        try{
            sql = format(sql)
         //   console.log("sql", sql)
         //   console.log("values", values)
            get().query(sql, values, (err, results, fields) => {
           //     console.log("err", err)
           //     console.log("res", results)
                resolve(results)
            })
        } catch(err){
            reject(err)
        }
    })
}