
namespace StableManager
{
    /// <summary>
    /// 
    /// </summary>
    public class Stable
    {
        public Horse StableHorse { get; private set; }
        public int Width { get; set; }
        public int Length { get; set; }

        public Stable(int width, int length, Horse horse)
        {
            Width = width;
            Length = length;
            StableHorse = horse;
        }

        public void PutHorseInStable(Horse horse)
        {
            if(StableHorse != null)
            {
                throw new StableFullException();
            }
            StableHorse = horse;
        }
        public void TakeHorseOutStable()
        {
            StableHorse = null;
        }
    }
}
