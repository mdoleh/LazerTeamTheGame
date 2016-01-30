using System;
using UnityEngine;

namespace Assets.Scripts.Player
{
    public class Player : Character, IPlayerControls
    {
        public ComboPlayerControls comboControls;
        [HideInInspector] public bool isGrounded = true;

        private Rigidbody2D rigidbody;
        private Transform groundCheck;
        public bool facingRight = true;

        private void Start()
        {
            rigidbody = GetComponent<Rigidbody2D>();
            groundCheck = transform.Find("groundCheck");
        }

        private void Update()
        {
            isGrounded = Physics2D.Linecast(transform.position, groundCheck.position, 1 << LayerMask.NameToLayer("Ground"));
        }

        public void MoveRight()
        {
            rigidbody.AddForce(Vector2.right * 300f * rigidbody.mass);
            if (!facingRight) Flip();
        }

        public void MoveLeft()
        {
            rigidbody.AddForce(Vector2.left * 300f * rigidbody.mass);
            if (facingRight) Flip();
        }

        public void Jump()
        {
            if (isGrounded) rigidbody.AddForce(Vector2.up * 3000f * rigidbody.mass);
        }

        public void Crouch()
        {
            // shrink collision box vertically
        }

        public void Gun()
        {
            comboControls.Gun = true;
        }

        public void Shield()
        {
            comboControls.Shield = true;
        }

        public void Boots()
        {
            comboControls.Boots = true;
        }

        public void Helmet()
        {
            comboControls.Helmet = true;
        }

        public void BootsRelease()
        {
            comboControls.Boots = false;
        }

        public void HelmetRelease()
        {
            comboControls.Helmet = false;
        }

        public void GunRelease()
        {
            comboControls.Gun = false;
        }

        public void ShieldRelease()
        {
            comboControls.Shield = false;
        }

        private void Flip()
        {
            // Switch the way the player is labelled as facing.
            facingRight = !facingRight;

            // Multiply the player's x local scale by -1.
            Vector3 theScale = transform.localScale;
            theScale.x *= -1;
            transform.localScale = theScale;
        }
    }
}
