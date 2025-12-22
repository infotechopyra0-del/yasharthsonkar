const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('Please add your MONGODB_URI to .env.local');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    throw error;
  }
}

async function createAdmin() {
  try {
    console.log('🚀 Starting admin creation process...\n');
    
    await connectDB();
    
    const existingAdmin = await Admin.findOne({ email: 'admin@yasharthsonkar.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Role:', existingAdmin.role);
      console.log('\n✨ You can login with existing credentials\n');
      await mongoose.connection.close();
      process.exit(0);
    }

    const admin = await Admin.create({
      email: 'admin@yasharthsonkar.com',
      password: 'YASH7@arth',
      role: 'admin'
    });

    console.log('✅ Admin created successfully!\n');
    console.log('═══════════════════════════════');
    console.log('📧 Email: admin@yasharthsonkar.com');
    console.log('🔐 Password: YASH7@arth');
    console.log('👤 Role: admin');
    console.log('═══════════════════════════════\n');
    console.log('🎉 You can now login at /admin/login\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:');
    console.error(error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();