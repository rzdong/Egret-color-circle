/**
 * 全局单例，数据存储
 * 
 * 继承Event，可以收发事件
 * 
 */

class Data {
    public static data: Data = null;
    public static i(): Data{
        if(this.data){
            return this.data;
        }else {
            this.data = new Data();
            return this.data;
        }
    }

    


}