class VacationModel {
    public vacationId: number;
    public location: string;
    public description: string;
    public fromDate: string;
    public untilDate: string;
    public price: string;
    public imageName: string;
    public image: FileList;
    public isFollowing: number;
    public followers: number;
}

export default VacationModel;