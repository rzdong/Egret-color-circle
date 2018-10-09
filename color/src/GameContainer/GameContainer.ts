class GameContainer extends BaseUILayer {
    public home: Home;
    public game: Game;
    public about: About;
    public rank: Rank;
    public grade: Grade;
    public suggest: Suggest;
    public setting: Setting;
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
        if(this.contains(this.game)){
            this.removeChild(this.game)
        }
        this.game = new Game(this);
        this.addChild(this.game)
    }

    public createAbout(): void {
        if(this.contains(this.about)){
            this.removeChild(this.about)
        }
        this.about = new About(this);
        this.addChild(this.about)
    }

    public createHome(): void {
        if(this.contains(this.home)){
            this.removeChild(this.home)
        }
        this.home = new Home(this);
        this.addChild(this.home)
    }

    public createRank(): void {
        if(this.contains(this.rank)){
            this.removeChild(this.rank)
        }
        this.rank = new Rank(this);
        this.addChild(this.rank)
    }

    public createSetting(): void {
        if(this.contains(this.setting)){
            this.removeChild(this.setting)
        }
        this.setting = new Setting(this);
        this.addChild(this.setting)
    }

    public createGrade(): void {
        if(this.contains(this.grade)){
            this.removeChild(this.grade)
        }
        this.grade = new Grade(this);
        this.addChild(this.grade)
    }

    public createSuggest(): void {
        if(this.contains(this.suggest)){
            this.removeChild(this.suggest)
        }
        this.suggest = new Suggest(this);
        this.addChild(this.suggest)
    }
}