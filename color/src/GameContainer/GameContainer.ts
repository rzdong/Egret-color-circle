class GameContainer extends BaseUILayer {
    public home: Home;
    public game: Game;
    public about: About;
    constructor(){
        super()
    }


    protected init(){
        console.log('GameContainer已加载')


        this.home = new Home(this);
        this.addChild(this.home);


        // 初始化游戏层
        
        
    }

    public createGame(): void {
        this.game = new Game();
        this.addChild(this.game)
    }

    public createAbout(): void {
        if(this.about){
            this.addChild(this.about);
            return;
        }
        this.about = new About();
        this.addChild(this.about)
    }
}