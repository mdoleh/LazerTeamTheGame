using UnityEngine;

namespace Assets.Scripts.Player
{
    public class BasicPlayerControls : MonoBehaviour
    {
        public Player player;

        private void Update()
        {
            // Handle movement
            if (Input.GetKey(KeyCode.D))
            {
                player.MoveRight();
            }
            if (Input.GetKey(KeyCode.A))
            {
                player.MoveLeft();
            }
            if (Input.GetKey(KeyCode.W))
            {
                player.Jump();
            }
            if (Input.GetKey(KeyCode.S))
            {
                player.Crouch();
            }

            // Handle equipment
            if (Input.GetKey(KeyCode.Keypad2))
            {
                player.Boots();
            }
            if (Input.GetKey(KeyCode.Keypad8))
            {
                player.Helmet();
            }
            if (Input.GetKey(KeyCode.Keypad6))
            {
                player.Gun();
            }
            if (Input.GetKey(KeyCode.Keypad4))
            {
                player.Shield();
            }
        }
    }
}
