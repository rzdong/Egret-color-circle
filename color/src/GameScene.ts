class GameScene extends BaseDisplayOC {
    private bg: BackgroundContainer
    private gc: GameContainer
    private pc: PopContainer

    constructor(){
        super()
    }

    public init() {
        console.log('GameScene主场景加载');
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        

        this.bg = new BackgroundContainer();
        this.addChild(this.bg);

        this.gc = new GameContainer();
        this.addChild(this.gc);

        this.pc = new PopContainer();
        this.addChild(this.pc)
    }
}