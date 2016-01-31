using UnityEngine;

namespace Assets.Scripts.Player
{
    public class BasicPlayerControls : MonoBehaviour
    {
        public Player player;

        private void FixedUpdate()
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

            // Handle movement key release
            if (Input.GetKeyUp(KeyCode.D))
            {
                player.Idle();
            }
            if (Input.GetKeyUp(KeyCode.A))
            {
                player.Idle();
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

            // Equipment release
            if (Input.GetKeyUp(KeyCode.Keypad2))
            {
                player.BootsRelease();
            }
            if (Input.GetKeyUp(KeyCode.Keypad8))
            {
                player.HelmetRelease();
            }
            if (Input.GetKeyUp(KeyCode.Keypad6))
            {
                player.GunRelease();
            }
            if (Input.GetKeyUp(KeyCode.Keypad4))
            {
                player.ShieldRelease();
            }
        }
    }
}
