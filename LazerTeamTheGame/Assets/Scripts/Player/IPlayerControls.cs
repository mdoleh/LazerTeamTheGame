namespace Assets.Scripts.Player
{
    public interface IPlayerControls
    {
        bool MoveRight();
        bool MoveLeft();
        bool Jump();
        bool Crouch();
        bool Gun();
        bool Shield();
        bool Boots();
        bool Helmet();
    }
}
