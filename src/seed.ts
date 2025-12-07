import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategorysService } from './components/categorys/categorys.service';
import { ProjectService } from './components/project/project.service';
import { UserService } from './components/user/user.service';
import { CreateCategoryDto } from './components/categorys/dto/create-category.dto';
import { CreateProjectDto } from './components/project/dto/create-project.dto';
import { Role } from './components/enums/role.enum';
import { Status } from './components/enums/status.ennum';
import { CreateUserDto } from './components/user/dto/create-user.dto';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const categoryService = app.get(CategorysService);
    const projectService = app.get(ProjectService);
    const userService = app.get(UserService);

    console.log('--- Starting Seeding ---');

    // 1. Create Admin User if not exists
    let adminUser;
    try {
        adminUser = await userService.findMail('admin@primechase.com');
        console.log('Admin user already exists.');
    } catch (e) {
        console.log('Creating Admin user...');
        const userDto = new CreateUserDto();
        userDto.name = 'Admin';
        userDto.email = 'admin@primechase.com';
        userDto.password = 'password123';
        userDto.role = Role.ADMIN;
        userDto.created_at = new Date();
        adminUser = await userService.create(userDto);
        console.log('Admin user created.');
    }

    // 2. Create Categories
    const categoriesData = [
        { name: 'Branding', description: 'Logo design, brand identity, and guidelines.' },
        { name: 'Web Design', description: 'UI/UX design for websites and applications.' },
        { name: 'Print', description: 'Business cards, brochures, and posters.' },
        { name: 'Social Media', description: 'Graphics and content for social platforms.' },
    ];

    const categoryMap = new Map();

    for (const catData of categoriesData) {
        const allCats = await categoryService.findAll();
        let category = allCats.find(c => c.name === catData.name);

        if (!category) {
            const dto = new CreateCategoryDto();
            dto.name = catData.name;
            dto.description = catData.description;
            category = await categoryService.create(dto);
            console.log(`Category created: ${catData.name}`);
        } else {
            console.log(`Category exists: ${catData.name}`);
        }
        categoryMap.set(catData.name, category);
    }

    // 3. Create Sample Projects
    const placeholderProjects = [
        {
            title: 'Modern Coffee Brand',
            description: 'A minimalist branding for a new coffee shop.',
            image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
            category: 'Branding',
            gallery: ['https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80']
        },
        {
            title: 'Tech Startup Website',
            description: 'Responsive landing page for a SaaS product.',
            image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            category: 'Web Design',
            gallery: []
        },
        {
            title: 'Fashion Event Poster',
            description: 'A3 poster for a local fashion week.',
            image_url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=800&q=80',
            category: 'Print',
            gallery: []
        },
        {
            title: 'Instagram Campaign',
            description: 'Series of posts for a summer sale.',
            image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
            category: 'Social Media',
            gallery: []
        }
    ];

    const mockRequest = {
        user: { userid: adminUser.userid, email: adminUser.email, name: adminUser.name, role: adminUser.role }
    } as any;

    for (const projData of placeholderProjects) {
        const category = categoryMap.get(projData.category);
        if (category) {
            const dto: any = {
                title: projData.title,
                description: projData.description,
                image_url: projData.image_url,
                gallery: projData.gallery || [],
                category: category.id,
                status: 'accepted',
                start_date: new Date(),
                created_at: new Date(),
                style_reference: 'Minimalist',
                color_preferences: ['#000000', '#FFFFFF'],
                font_preferences: 'Sans-serif',
                due_date: new Date(),
                client_name: 'Sample Client',
                client_email: 'client@example.com',
                rejection_reason: ''
            };

            try {
                // Check if project already exists? 
                // We will just create duplicates if run multiple times, simplistic for now.
                // Or we can check if we want to be safe, but titles might overlap.
                await projectService.create(dto, mockRequest);
                console.log(`Project created: ${projData.title}`);
            } catch (error) {
                console.error(`Failed to create project ${projData.title}`, error.message);
            }
        }
    }

    console.log('--- Seeding Completed ---');
    await app.close();
}
bootstrap();
